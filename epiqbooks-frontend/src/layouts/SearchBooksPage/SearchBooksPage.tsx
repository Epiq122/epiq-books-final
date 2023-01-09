import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../../layouts/Utils/LoadingSpinner';
import { SearchBook } from './components/SearchBook';
import { Pagination } from '../../layouts/Utils/Pagination';
import React from 'react';
import { Link } from 'react-router-dom';
import BookModel from '../../models/BookModel';

export const SearchBooksPage = () => {
  ///////////////////////////////////////////////////////
  // This is the State for Books
  ///////////////////////////////////////////////////////
  // this is the state for our books, ( an array of books ) - of type array
  const [books, setBooks] = useState<BookModel[]>([]);
  // this is the state for loading, the API is async so there could be sometime before we get the data back
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // this is for our HTTP error if the API call fails
  const [httpError, setHttpError] = useState(null);

  ///////////////////////////////////////////////////////
  // This is the State for Pagination
  ///////////////////////////////////////////////////////

  // this is the state for our page number
  const [currentPage, setCurrentPage] = useState(1);
  // shows how many books we want to show per page
  const [booksPerPage] = useState(5);
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  ///////////////////////////////////////////////////////
  // This is the State for Search
  ///////////////////////////////////////////////////////
  const [search, setSearch] = useState('');
  const [searchUrl, setSearchUrl] = useState('');

  ///////////////////////////////////////////////////////
  // This is the State for Categories
  ///////////////////////////////////////////////////////
  const [categories, setCategories] = useState('Book category');

  // this is the function called to get our Books
  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = 'http://localhost:8080/api/books';
      // url with the query params
      let url: string = '';

      // If statement for our search
      if (searchUrl === '') {
        url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
      } else {
        url = baseUrl + searchUrl;
      }

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

      // Setting the state for the pagination
      setTotalAmountOfBooks(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

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

    // scroll to the top of the page
    window.scrollTo(0, 0);
  }, [currentPage, searchUrl]);

  // everytime we call the hook we want to call currentPage

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

  // This handles all the search changes
  const handleSearchChange = () => {
    console.log('button clicked');
    if (search === '') {
      setSearchUrl('');
    } else {
      setSearchUrl(
        `/search/findByTitleContaining?title=${search}&page=0&size=${booksPerPage}`
      );
    }
  };

  //Category fields
  const categoryOptions = (value: string) => {
    if (
      value.toLowerCase() === 'fe' ||
      value.toLowerCase() === 'be' ||
      value.toLowerCase() === 'data' ||
      value.toLowerCase() === 'devops'
    ) {
      setCategories(value);
      setSearchUrl(
        `/search/findByCategory?category=${value}&page=0&size=${booksPerPage}`
      );
    } else {
      setCategories('All');
      setSearchUrl(`?page=0&size=${booksPerPage}`);
    }
  };

  /// Pagination
  const indexOfLastBook: number = currentPage * booksPerPage;
  const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
  let lastItem: number =
    booksPerPage * currentPage <= totalAmountOfBooks
      ? booksPerPage * currentPage
      : totalAmountOfBooks;
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className=''>
      <div className='container'>
        <div>
          <div className='row mt-5'>
            <div className='col-6'>
              <div className='d-flex'>
                <input
                  className='form-control me-2'
                  type='search'
                  placeholder='Search'
                  aria-labelledby='Search'
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className='btn btn-success '
                  onClick={() => handleSearchChange()}
                >
                  Search
                </button>
              </div>
            </div>
            <div className='col-4'>
              <div className='dropdown'>
                <button
                  className='btn btn-secondary dropdown-toggle bg-black text-white rounded-lg hover:bg-gray-500 px-6'
                  type='button'
                  id='dropdownMenuButton1'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  {categories}
                </button>
                <ul
                  className='dropdown-menu'
                  aria-labelledby='dropdownMenuButton1'
                >
                  <li onClick={() => categoryOptions('All')}>
                    <Link className='dropdown-item' to='#'>
                      All
                    </Link>
                  </li>
                  <li onClick={() => categoryOptions('FE')}>
                    <Link className='dropdown-item' to='#'>
                      Front End
                    </Link>
                  </li>
                  <li onClick={() => categoryOptions('BE')}>
                    <Link className='dropdown-item' to='#'>
                      Back End
                    </Link>
                  </li>
                  <li onClick={() => categoryOptions('Data')}>
                    <Link className='dropdown-item' to='#'>
                      Data
                    </Link>
                  </li>
                  <li onClick={() => categoryOptions('DevOps')}>
                    <Link className='dropdown-item' to='#'>
                      DevOps
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {totalAmountOfBooks > 0 ? (
            <>
              <div className='mt-3 text-white'>
                <h5>Number of results: ({totalAmountOfBooks})</h5>
              </div>
              <p className='text-white'>
                {indexOfFirstBook + 1} - {lastItem} of {totalAmountOfBooks}{' '}
                items:
              </p>
              {books.map((book) => (
                <SearchBook book={book} key={book.id} />
              ))}
            </>
          ) : (
            // display if there are no books
            <div className='m-5'>
              <h3>Can't find what your looking for?</h3>
              <Link
                to='#'
                type='button'
                className='btn bg-black text-white px-4 fw-bold'
              >
                Library Services
              </Link>
            </div>
          )}

          {/*    for the pagination*/}
          {totalPages > 1 && ( // only render if there is more than 1 page
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          )}
        </div>
      </div>
    </div>
  );
};
