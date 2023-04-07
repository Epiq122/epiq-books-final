import React, {useEffect, useState} from 'react';
import {useOktaAuth} from '@okta/okta-react/';
import {LoadingSpinner} from '../Utils/LoadingSpinner';
import BookModel from '../../models/BookModel';
import {StarsReview} from '../Utils/StarsReview';
import ReviewModel from '../../models/ReviewModel';

import {CheckoutAndReviewBox} from './CheckOutAndReviewsBox';
import {LatestReviews} from './LatestReviews';
import ReviewRequestModel from '../../models/ReviewRequestModel';

export function BookCheckoutPage() {

    const {authState} = useOktaAuth();


    const [book, setBooks] = useState<BookModel>();
    const [isLoadingBook, setIsLoadingBook] = useState<boolean>(true);
    const [httpError, setHttpError] = useState(null);


    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState<number>(0);
    const [isLoadingReview, setIsLoadingReview] = useState<boolean>(true);


    const [isReviewLeft, setIsReviewLeft] = useState<boolean>(false);
    const [isLoadingUserReview, setIsLoadingUserReview] = useState<boolean>(true);


    const [loansCount, setLoansCount] = useState<number>(0);
    const [isLoadingLoansCount, setIsLoadingLoansCount] = useState<boolean>(true);


    const [isCheckedOut, setIsCheckedOut] = useState<boolean>(false);
    const [isLoadingBookCheckedOut, setIsLoadingBookCheckedOut] =
        useState<boolean>(true);


    const bookId = window.location.pathname.split('/')[2];

    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;


            const response = await fetch(baseUrl);


            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();


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


            setBooks(loadedBook);

            setIsLoadingBook(false);
        };
        fetchBook().catch((error: any) => {
            setIsLoadingBook(false);
            setHttpError(error.message);
        });
    }, [bookId, isCheckedOut]);

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
                weightedStarReview += responseData[key].rating;
            }
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

    useEffect(() => {
        const fetchLoansCount = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/books/secure/currentloans/count`;
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

    useEffect(() => {
        const fetchUserCheckoutBook = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/books/secure/ischeckedout/byuser/?bookId=${bookId}`;
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

    if (
        isLoadingBook ||
        isLoadingReview ||
        isLoadingLoansCount ||
        isLoadingBookCheckedOut ||
        isLoadingUserReview
    ) {
        return (
            <div className="container m-5">
                <LoadingSpinner/>
            </div>
        );
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }


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

    async function submitReview(starInput: number, reviewDescription: string) {
        let bookId: number = 0;
        if (book?.id) {
            bookId = book.id;
        }
        const reviewRequestModel = new ReviewRequestModel(
            starInput,
            bookId,
            reviewDescription,
        );
        const url = `http://localhost:8080/api/reviews/secure`;
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewRequestModel),
        };
        const reviewResponse = await fetch(url, requestOptions);
        if (!reviewResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setIsReviewLeft(true);
    }

    return (
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {book?.img ? (
                            <img src={book?.img} width="226" height="349" alt="Book"/>
                        ) : (
                            <img
                                src={require('../../images/python-book.png')}
                                width="226"
                                height="349"
                                alt="Book"
                            />
                        )}
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2 className="text-red-500 font-bold mt-3 mb-3 text-2xl ">
                                {book?.title}
                            </h2>
                            <h5 className="text-primary mb-3 text-xl">{book?.author}</h5>
                            <p className="lead text-white">{book?.description}</p>
                            <StarsReview rating={totalStars} size={32}/>
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

                <hr/>
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={false}/>
            </div>
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center alighn-items-center">
                    {book?.img ? (
                        <img src={book?.img} width="226" height="349" alt="Book"/>
                    ) : (
                        <img
                            src={require('../../images/python-book.png')}
                            width="226"
                            height="349"
                            alt="Book"
                        />
                    )}
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 className="text-primary">{book?.author}</h5>
                        <p className="lead">{book?.description}</p>
                        <StarsReview rating={totalStars} size={32}/>
                    </div>
                </div>
                <CheckoutAndReviewBox
                    book={book}
                    mobile
                    loansCount={loansCount}
                    isAuthenticated={authState?.isAuthenticated}
                    isCheckedOut={isCheckedOut}
                    checkOutBook={checkOutBook}
                    isReviewLeft={isReviewLeft}
                    submitReview={submitReview}
                />
                <hr/>
                <LatestReviews reviews={reviews} bookId={book?.id} mobile/>
            </div>
        </div>
    );
}
