import {ReturnBook} from './ReturnBook';
import React, {useEffect, useState} from 'react';
import BookModel from '../../..//models/BookModel';
import {LoadingSpinner} from '../../Utils/LoadingSpinner';
import {Link} from 'react-router-dom';


export const Carousel = () => {
    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl = 'http://localhost:8080/api/books';
            const url: string = `${baseUrl}?page=0&size=9`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const responseJson = await response.json();

            const responseData = responseJson._embedded.books;


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
        return <LoadingSpinner/>;
    }
    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div className="container mt-5" style={{height: 550}}>
            <div className="homepage-carousel-title">
                <h3 className="text-gray-200 text-xl">
                    Take your learning to an EPIQ new level!
                </h3>
            </div>
            <div
                id="carouselExampleControls"
                className="carousel carousel-light slide mt-5
                d-none d-lg-block px-8 "
                data-bs-interval="false"
            >
                {/* Desktop */}
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="flex flex-row items-center justify-center">
                            {/*// loop through it 3 different times*/}
                            {books.slice(0, 3).map((book) => (
                                <ReturnBook book={book} key={book.id}/>
                            ))}
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="flex flex-row items-center justify-center">
                            {books.slice(3, 6).map((book) => (
                                <ReturnBook book={book} key={book.id}/>
                            ))}
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="flex flex-row items-center justify-center">
                            {books.slice(6, 9).map((book) => (
                                <ReturnBook book={book} key={book.id}/>
                            ))}
                        </div>
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                >
          <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
          ></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                >
          <span
              className="carousel-control-next-icon"
              aria-hidden="true"
          ></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* Mobile */}
            <div className="d-lg-none mt-3">
                <div className="row d-flex justify-content-center align-items-center">
                    <ReturnBook book={books[7]} key={books[7].id}/>
                </div>
            </div>
            <div className="homepage-carousel-title mt-3">
                <Link
                    className="bg-black text-white rounded-lg hover:bg-gray-500 pt-3
            pb-3 pl-5 pr- mt-3 py-2 px-4 text-lg"
                    to="/search"
                >
                    View More
                </Link>
            </div>
        </div>
    );
};
