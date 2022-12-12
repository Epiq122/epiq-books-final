import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../../layouts/Utils/LoadingSpinner';
import BookModel from '../..//models/BookModel';
import { StarsReview } from '../../layouts/Utils/StarsReview';
import ReviewModel from '../..//models/ReviewModel';

import React from 'react';
import { CheckoutAndReviewBox } from './CheckOutAndReviewsBox';
import { LatestReviews } from './LatestReviews';

export const BookCheckoutPage = () => {
  // state for books
  const [book, setBooks] = useState<BookModel>();
  const [isLoadingBook, setIsLoadingBook] = useState<boolean>(true);
  const [httpError, setHttpError] = useState(null);

  // Review State
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState<number>(0);
  const [isLoadingReview, setIsLoadingReview] = useState<boolean>(true);

  // Used to grab the path parameter from the URL
  const bookId = window.location.pathname.split('/')[2];
  // this is the function called to get our Books ( BOOK ID )
  useEffect(() => {
    const fetchBook = async () => {
      const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;

      // this is going to fetch the book from the backend api
      const response = await fetch(baseUrl); // creates a variable for whatever we fetch

      // checks to see if we successfully got the data back
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      // get the response json, for a easy way to read the data
      const responseJson = await response.json();

      // book model object        '
      const loadedBook: BookModel = {
        id: responseJson.id,
        title: responseJson.title,
        author: responseJson.author,
        description: responseJson.description,
        copies: responseJson.copies,
        copiesAvailable: responseJson.copiesAvailable,
        category: responseJson.category,
        img: responseJson.img,
      };

      // set the state of the books
      setBooks(loadedBook);
      // set the state of loading of the state
      setIsLoadingBook(false);
    };
    // this is incase the API call fails
    fetchBook().catch((error: any) => {
      setIsLoadingBook(false);
      setHttpError(error.message);
    });
  }, []);

  // REVIEWS USE EFFECT
  useEffect(() => {
    const fetchReviews = async () => {
      const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;

      const responseReviews = await fetch(reviewUrl);

      if (!responseReviews.ok) {
        throw new Error('Something went wrong!');
      }
      const responseJsonReviews = await responseReviews.json();
      const responseData = responseJsonReviews._embedded.reviews;
      const loadedReviews: ReviewModel[] = [];

      // only review the last 20 books
      let weightedStarReview: number = 0;
      for (const key in responseData) {
        loadedReviews.push({
          id: responseData[key].id,
          bookId: responseData[key].bookId,
          date: responseData[key].date,
          rating: responseData[key].rating,
          userEmail: responseData[key].userEmail,
          reviewDescription: responseData[key].reviewDescription,
        });
        weightedStarReview = weightedStarReview + responseData[key].rating;
      }
      // find the average of the weighted star review
      if (loadedReviews) {
        const round = (
          Math.round((weightedStarReview / loadedReviews.length) * 2) / 2
        ).toFixed(1);
        setTotalStars(Number(round));
      }
      setReviews(loadedReviews);
      setIsLoadingReview(false);
    };
    fetchReviews().catch((error: any) => {
      setIsLoadingReview(false);
      setHttpError(error.message);
    });
  }, []);

  // this is for our loading
  if (isLoadingBook || isLoadingReview) {
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
    <div>
      <div className='container d-none d-lg-block'>
        <div className='row mt-5'>
          <div className='col-sm-2 col-md-2'>
            {book?.img ? (
              <img src={book?.img} alt='book' width={226} height={349} />
            ) : (
              <img
                src={'../../../images/python-book.png'}
                alt='book'
                width={226}
                height={349}
              />
            )}
          </div>

          <div className='col-4 col-md-4 container'>
            <div className='ml-2'>
              <h2>{book?.title}</h2>
              <h5 className='text-primary'>{book?.author}</h5>
              <p className='lead'>{book?.description}</p>
              <StarsReview rating={2.5} size={32} />
            </div>
          </div>
          <CheckoutAndReviewBox book={book} mobile={false} />
        </div>
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
      </div>
      <div className='container d-lg-none mt-5'>
        <div className='d-flex justify-content-center align-items-center'>
          {book?.img ? (
            <img src={book?.img} alt='book' width={226} height={349} />
          ) : (
            <img
              src={'../../../images/python-book.png'}
              alt='book'
              width={226}
              height={349}
            />
          )}
        </div>
        <div className='mt-4'>
          <div className='ml-2'>
            <h2>{book?.title}</h2>
            <h5 className='text-primary'>{book?.author}</h5>
            <p className='lead'>{book?.description}</p>
            <StarsReview rating={4} size={32} />
          </div>
        </div>
        <CheckoutAndReviewBox book={book} mobile={true} />
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
      </div>
    </div>
  );
};
