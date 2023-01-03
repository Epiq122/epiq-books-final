import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../../layouts/Utils/LoadingSpinner';
import BookModel from '../..//models/BookModel';
import { StarsReview } from '../../layouts/Utils/StarsReview';
import ReviewModel from '../..//models/ReviewModel';

import React from 'react';
import { CheckoutAndReviewBox } from './CheckOutAndReviewsBox';
import { LatestReviews } from './LatestReviews';
import { useOktaAuth } from '@okta/okta-react/';
import ReviewRequestModel from '../../models/ReviewRequestModel';

export const BookCheckoutPage = () => {
  // Add our Okta Authenication
  const { authState } = useOktaAuth();

  // state for books
  const [book, setBooks] = useState<BookModel>();
  const [isLoadingBook, setIsLoadingBook] = useState<boolean>(true);
  const [httpError, setHttpError] = useState(null);

  // Review State
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState<number>(0);
  const [isLoadingReview, setIsLoadingReview] = useState<boolean>(true);

  // For leaving a review ( NOT STARS)
  // has the user left a review on this specific book
  const [isReviewLeft, setIsReviewLeft] = useState<boolean>(false);
  const [isLoadingUserReview, setIsLoadingUserReview] = useState<boolean>(true);

  //Loans Count State
  const [loansCount, setLoansCount] = useState<number>(0);
  const [isLoadingLoansCount, setIsLoadingLoansCount] = useState<boolean>(true);

  // Books checkout State
  const [isCheckedOut, setIsCheckedOut] = useState<boolean>(false);
  const [isLoadingBookCheckedOut, setIsLoadingBookCheckedOut] =
    useState<boolean>(true);

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
  }, [bookId, isCheckedOut]);

  // REVIEWS USE EFFECT ( stars )
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
          book_Id: responseData[key].bookId,
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
  }, [bookId, isReviewLeft]);

  // Reviews USE EFFECT ( user review )
  useEffect(() => {
    const fetchUserReviewBook = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/api/reviews/secure/user/book/?bookId=${bookId}`;
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            'Content-Type': 'application/json',
          },
        };
        const userReview = await fetch(url, requestOptions);
        if (!userReview.ok) {
          throw new Error('Something went wrong');
        }
        const userReviewResponseJson = await userReview.json();
        setIsReviewLeft(userReviewResponseJson);
      }
      setIsLoadingUserReview(false);
    };
    fetchUserReviewBook().catch((error: any) => {
      setIsLoadingUserReview(false);
      setHttpError(error.message);
    });
  }, [authState, bookId]);
  // LOANS COUNT USE EFFECT
  useEffect(() => {
    const fetchLoansCount = async () => {
      // we do not want to call this api if the user is authenticated
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/api/books/secure/currentloans/count`;
        // deal with authentication
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            'Content-Type': 'application/json',
          },
        };
        const currentLoansCountResponse = await fetch(url, requestOptions);
        if (!currentLoansCountResponse.ok) {
          throw new Error('Something went wrong!');
        }
        const currentLoansCountResponseJson =
          await currentLoansCountResponse.json();
        setLoansCount(currentLoansCountResponseJson);
      }
      setIsLoadingLoansCount(false);
    };
    fetchLoansCount().catch((error: any) => {
      setIsLoadingLoansCount(false);
      setHttpError(error.message);
    });
  }, [authState, isCheckedOut]);

  // BOOK CHECKOUT USE EFFECT
  useEffect(() => {
    const fetchUserCheckoutBook = async () => {
      // we do not want to call this api if the user is authenticated
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/api/books/secure/ischeckedout/byuser/?bookId=${bookId}`;
        // deal with authentication
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            'Content-Type': 'application/json',
          },
        };
        const bookCheckedOut = await fetch(url, requestOptions);
        if (!bookCheckedOut.ok) {
          throw new Error('Something went wrong!');
        }
        const bookCheckedOutJson = await bookCheckedOut.json();
        setIsCheckedOut(bookCheckedOutJson);
      }
      setIsLoadingBookCheckedOut(false);
    };
    fetchUserCheckoutBook().catch((error: any) => {
      setIsLoadingBookCheckedOut(false);
      setHttpError(error.message);
    });
  }, [authState, bookId]);

  // this is for our loading
  if (
    isLoadingBook ||
    isLoadingReview ||
    isLoadingLoansCount ||
    isLoadingBookCheckedOut ||
    isLoadingUserReview
  ) {
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

  // for checking out the book

  async function checkOutBook() {
    const url = `http://localhost:8080/api/books/secure/checkout/?bookId=${book?.id}`;
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        'Content-Type': 'application/json',
      },
    };
    const checkoutResponse = await fetch(url, requestOptions);
    if (!checkoutResponse.ok) {
      throw new Error('Something went wrong!');
    }
    setIsCheckedOut(true);
  }

  // for submitting a review
  async function submitReview(starInput: number, reviewDescription: string) {
    let bookId: number = 0;
    // lets us know if there is a book id
    if (book?.id) {
      bookId = book.id;
    }
    const reviewRequestModel = new ReviewRequestModel(
      starInput,
      bookId,
      reviewDescription
    );
    // creates a URL that acesses the endpoint in the spring app
    const url = `http://localhost:8080/api/reviews/secure`;
    const requestOptions = {
      method: 'POST',
      headers: {
        //passing in the bare token and auth
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewRequestModel),
    };
    // calls the api
    const reviewResponse = await fetch(url, requestOptions);
    if (!reviewResponse.ok) {
      throw new Error('Something went wrong!');
    }
    setIsReviewLeft(true);
  }

  return (
    <div>
      <div className='container d-none d-lg-block'>
        <div className='row mt-5'>
          <div className='col-sm-2 col-md-2'>
            {book?.img ? (
              <img src={book?.img} width='226' height='349' alt='Book' />
            ) : (
              <img
                src={require('../../images/python-book.png')}
                width='226'
                height='349'
                alt='Book'
              />
            )}
          </div>
          <div className='col-4 col-md-4 container'>
            <div className='ml-2'>
              <h2>{book?.title}</h2>
              <h5 className='text-primary'>{book?.author}</h5>
              <p className='lead'>{book?.description}</p>
              <StarsReview rating={totalStars} size={32} />
            </div>
          </div>
          <CheckoutAndReviewBox
            book={book}
            mobile={false}
            loansCount={loansCount}
            isAuthenticated={authState?.isAuthenticated}
            isCheckedOut={isCheckedOut}
            checkOutBook={checkOutBook}
            isReviewLeft={isReviewLeft}
            submitReview={submitReview}
          />
        </div>
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
      </div>
      <div className='container d-lg-none mt-5'>
        <div className='d-flex justify-content-center alighn-items-center'>
          {book?.img ? (
            <img src={book?.img} width='226' height='349' alt='Book' />
          ) : (
            <img
              src={require('../../images/python-book.png')}
              width='226'
              height='349'
              alt='Book'
            />
          )}
        </div>
        <div className='mt-4'>
          <div className='ml-2'>
            <h2>{book?.title}</h2>
            <h5 className='text-primary'>{book?.author}</h5>
            <p className='lead'>{book?.description}</p>
            <StarsReview rating={totalStars} size={32} />
          </div>
        </div>
        <CheckoutAndReviewBox
          book={book}
          mobile={true}
          loansCount={loansCount}
          isAuthenticated={authState?.isAuthenticated}
          isCheckedOut={isCheckedOut}
          checkOutBook={checkOutBook}
          isReviewLeft={isReviewLeft}
          submitReview={submitReview}
        />
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
      </div>
    </div>
  );
};
