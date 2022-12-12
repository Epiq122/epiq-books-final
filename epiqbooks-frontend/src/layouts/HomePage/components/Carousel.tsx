import { ReturnBook } from './ReturnBook';
import React from 'react';
import { useEffect, useState } from 'react';
import BookModel from '../../..//models/BookModel';
import { LoadingSpinner } from '../../Utils/LoadingSpinner';
import { Link } from 'react-router-dom';

// this is going to be used so we can get the data from the API

export const Carousel = () => {
  // this is the state for our books, ( an array of books ) - of type array
  const [books, setBooks] = useState<BookModel[]>([]);
  // this is the state for loading, the API is async so there could be sometime before we get the data back
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // this is for our HTTP error if the API call fails
  const [httpError, setHttpError] = useState(null);

  // this is the function called to get our Books
  useEffect(() => {
    return () => {
      const fetchBooks = async () => {
        const baseUrl: string = 'http://localhost:8080/api/books';
        // url with the query params
        const url: string = `${baseUrl}?page=0&size=9`;
        // this is going to fetch the book from the backend api
        const response = await fetch(url); // creates a variable for whatever we fetch

        // checks to see if we successfully got the data back
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        // get the response json, for a easy way to read the data
        const responseJson = await response.json();

        // this it the object we want to get the json from
        const responseData = responseJson._embedded.books;

        const loadedBooks: BookModel[] = [];
        // loop through the data and create a new book object
        for (const key in responseData) {
          loadedBooks.push({
            id: responseData[key].id,
            title: responseData[key].title,
            author: responseData[key].author,
            description: responseData[key].description,
            copies: responseData[key].copies,
            copiesAvailable: responseData[key].copiesAvailable,
            category: responseData[key].category,
            img: responseData[key].img,
          });
        }
        // set the state of the books
        setBooks(loadedBooks);
        // set the state of loading of the state
        setIsLoading(false);
      };
      // this is incase the API call fails
      fetchBooks().catch((error: any) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
    };
  }, []);

  // this is for our loading
  if (isLoading) {
    return (
      <div className='container m-5'>
        <LoadingSpinner />
      </div>
    );
  }

  // this is for our http error
  if (httpError) {
    return (
      <div className='container m-5'>
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div className='container mt-5' style={{ height: 550 }}>
      <div className='homepage-carousel-title'>
        <h3>Level up your skills with one of our books</h3>
      </div>
      <div
        id='carouselExampleControls'
        className='carousel carousel-dark slide mt-5
                d-none d-lg-block'
        data-bs-interval='false'
      >
        {/* Desktop */}
        <div className='carousel-inner'>
          <div className='carousel-item active'>
            <div className='row d-flex justify-content-center align-items-center'>
              {/*loop through books and put on the dom* first 3* books */}
              {books.slice(0, 3).map((book) => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </div>
          </div>
          <div className='carousel-item'>
            <div className='row d-flex justify-content-center align-items-center'>
              {/*loop through books and put on the dom* second 3* books */}
              {books.slice(3, 6).map((book) => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </div>
          </div>
          <div className='carousel-item'>
            <div className='row d-flex justify-content-center align-items-center'>
              {/*loop through books and put on the dom* last 3* books */}
              {books.slice(6, 9).map((book) => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </div>
          </div>
        </div>
        <button
          className='carousel-control-prev'
          type='button'
          data-bs-target='#carouselExampleControls'
          data-bs-slide='prev'
        >
          <span
            className='carousel-control-prev-icon'
            aria-hidden='true'
          ></span>
          <span className='visually-hidden'>Previous</span>
        </button>
        <button
          className='carousel-control-next'
          type='button'
          data-bs-target='#carouselExampleControls'
          data-bs-slide='next'
        >
          <span
            className='carousel-control-next-icon'
            aria-hidden='true'
          ></span>
          <span className='visually-hidden'>Next</span>
        </button>
      </div>

      {/* Mobile */}
      <div className='d-lg-none mt-3'>
        <div className='row d-flex justify-content-center align-items-center'>
          <ReturnBook book={books[7]} key={books[7].id} />
        </div>
      </div>
      <div className='homepage-carousel-title mt-3'>
        <Link className='btn btn-outline-secondary btn-lg' to='/search'>
          View More
        </Link>
      </div>
    </div>
  );
};
