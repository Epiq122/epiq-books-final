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
    const fetchBooks = async () => {
      const baseUrl = 'http://localhost:8080/api/books';
      // url with the query params
      const url: string = `${baseUrl}?page=0&size=9`;
      // this is going to fetch the book from the backend api
      const response = await fetch(url);
      //check the response
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      //convert the response to json
      const responseJson = await response.json();

      // grabbed the data in the embedded book array
      const responseData = responseJson._embedded.books;

      // now we have all the books in responseData

      // push a whole bunch of books into the books array
      const loadedBooks: BookModel[] = [];

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
      setBooks(loadedBooks);
      setIsLoading(false);
    };
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
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
        <h3>Find your next "I stayed up too late reading" book.</h3>
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
              {/*// loop through it 3 different times*/}
              {books.slice(0, 3).map((book) => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </div>
          </div>
          <div className='carousel-item'>
            <div className='row d-flex justify-content-center align-items-center'>
              {books.slice(3, 6).map((book) => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </div>
          </div>
          <div className='carousel-item'>
            <div className='row d-flex justify-content-center align-items-center'>
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
