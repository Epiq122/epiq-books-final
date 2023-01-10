import { useEffect, useState } from 'react';
import BookModel from '../../../models/BookModel';
import { LoadingSpinner } from '../../Utils/LoadingSpinner';
import { Pagination } from '../../Utils/Pagination';
import { ChangeQuantityOfBook } from './ChangeQuantityOfBook';

export const ChangeQuantityOfBooks = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // for Deleteing book
  const [bookDelete, setBookDelete] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = `http://localhost:8080/api/books?page=${
        currentPage - 1
      }&size=${booksPerPage}`;

      const response = await fetch(baseUrl);

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
  }, [currentPage, bookDelete]);

  const deleteBook = () => setBookDelete(!bookDelete);

  /// Pagination
  const indexOfLastBook: number = currentPage * booksPerPage;
  const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
  let lastItem: number =
    booksPerPage * currentPage <= totalAmountOfBooks
      ? booksPerPage * currentPage
      : totalAmountOfBooks;
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
    <div className='container mt-5'>
      {totalAmountOfBooks > 0 ? (
        <>
          <div className='mt-3'>
            <h5 className='text-white'>
              Number of results :({totalAmountOfBooks})
            </h5>
          </div>
          <p className='text-white'>
            {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:
          </p>
          {books.map((book) => (
            <ChangeQuantityOfBook
              book={book}
              key={book.id}
              deleteBook={deleteBook}
            />
          ))}
        </>
      ) : (
        <h5 className='text-white'>Add a book before changing quantity</h5>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      )}
    </div>
  );
};
