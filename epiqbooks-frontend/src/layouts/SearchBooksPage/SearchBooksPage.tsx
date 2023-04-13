import React, { useEffect, useState } from 'react';
import { LoadingSpinner } from '../../layouts/Utils/LoadingSpinner';
import { SearchBook } from './components/SearchBook';
import { Pagination } from '../../layouts/Utils/Pagination';
import { Link } from 'react-router-dom';
import BookModel from '../../models/BookModel';

export const SearchBooksPage = () => {
  // State for Books
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState(null);

  // State for Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // State for Search
  const [search, setSearch] = useState('');
  const [searchUrl, setSearchUrl] = useState('');

  // State for Categories
  const [categories, setCategories] = useState('Book category');

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = 'http://localhost:8080/api/books';
      let url: string = '';

      if (searchUrl === '') {
        url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
      } else {
        url = baseUrl + searchUrl;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseJson = await response.json();

      // Handle the paginated response
      if (responseJson.content && responseJson.content.length > 0) {
        const responseData = responseJson.content;

        setTotalAmountOfBooks(responseJson.totalElements);
        setTotalPages(responseJson.totalPages);

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
      } else {
        console.log('No books found in the response');
      }
      setIsLoading(false);
    };
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
      console.log('this is the error!!');
    });
  }, []);

  if (isLoading) {
    return (
      <div className='container m-5'>
        <LoadingSpinner />
      </div>
    );
  }

  if (httpError) {
    return (
      <div className='container m-5 text-white'>
        <p>{httpError}</p>
      </div>
    );
  }

  const handleSearchChange = () => {
    console.log('button clicked');
    if (search === '') {
      setSearchUrl('');
    } else {
      setSearchUrl(
        `/search/findByTitleContaining?title=${search}&page=0&size=${booksPerPage}`,
      );
    }
  };

  const categoryOptions = (value: string) => {
    if (
      value.toLowerCase() === 'fe' ||
      value.toLowerCase() === 'be' ||
      value.toLowerCase() === 'data' ||
      value.toLowerCase() === 'devops'
    ) {
      setCategories(value);
      setSearchUrl(
        `/search/findByCategory?category=${value}&page=0&size=${booksPerPage}`,
      );
    } else {
      setCategories('Book category');
      setSearchUrl('');
    }
  };

  const searchBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearchChange();
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='container mx-auto px-4'>
      <h1 className='mt-10 mb-6 text-2xl font-bold'>Search for books</h1>
      <div className='flex items-center'>
        <input
          type='text'
          className='w-full p-2 border border-gray-300 rounded-md'
          placeholder='Search by book title'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className='ml-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md'
          type='button'
          onClick={handleSearchChange}
        >
          Search
        </button>
      </div>
      <br />
      <div className='input-group'>
        <select
          className='w-full p-2 border border-gray-300 rounded-md'
          value={categories}
          onChange={(e) => categoryOptions(e.target.value)}
        >
          <option>Book category</option>
          <option>FE</option>
          <option>BE</option>
          <option>Data</option>
          <option>DevOps</option>
        </select>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
        {books.map((book) => (
          <SearchBook key={book.id} book={book} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </div>
  );
};
