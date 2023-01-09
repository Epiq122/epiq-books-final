import React from 'react';
import { Link } from 'react-router-dom';
import BookModel from '../../models/BookModel';
// @ts-ignore
import { LeaveAReview } from '../Utils/LeaveAReview';

export const CheckoutAndReviewBox: React.FC<{
  book: BookModel | undefined;
  mobile: boolean;
  loansCount: number;
  isAuthenticated: any;
  isCheckedOut: boolean;
  checkOutBook: any;
  isReviewLeft: boolean;
  submitReview: any;
}> = (props) => {
  function buttonRender() {
    if (props.isAuthenticated) {
      // check if the book isnt checked out and the loans count is less than 5
      if (!props.isCheckedOut && props.loansCount < 5) {
        return (
          <button
            onClick={() => props.checkOutBook()}
            className='btn btn-success btn-lg mt-4 mb-3'
          >
            Checkout
          </button>
        );
      }
      if (props.isCheckedOut) {
        return (
          <p>
            <b>Book currently checked out</b>
          </p>
        );
        // if the loans count is more than 5
      }
      if (!props.isCheckedOut) {
        return <p className='text-danger'>Sorry! to many books checked out</p>;
      }
    }
    return (
      <Link to={'/login'} className='btn btn-success btn-lg'>
        Sign in
      </Link>
    );
  }
  function reviewRender() {
    if (props.isAuthenticated && !props.isReviewLeft) {
      return (
        <div>
          <LeaveAReview submitReview={props.submitReview} />
        </div>
      );
    }
    if (props.isAuthenticated && props.isReviewLeft) {
      return (
        <p>
          <b>Thanks for the review!</b>
        </p>
      );
    }
    return (
      <div>
        <hr />
        <p className='font-bold'>Must be signed in to leave a review.</p>
      </div>
    );
  }
  return (
    // checks to see if the card needs to be mobile or not
    <div
      className={
        props.mobile
          ? 'card d-flex mt-5 bg-gray-600'
          : 'card col-3 container d-flex mb-5 bg-gray-600 mt-5'
      }
    >
      <div className='card-body container mt-3 bg-gray-600'>
        <div className='mt-3 b0'>
          <p className='text-white py-3 text-xl'>
            <b className='text-red-500 '>{props.loansCount} / 5 </b>
            books checked out
          </p>
          <hr />
          {props.book &&
          props.book.copiesAvailable &&
          props.book.copiesAvailable > 0 ? (
            <h4 className='text-sucess font-bold text-yellow-400 mb-1 mt-3'>
              Avaliable
            </h4>
          ) : (
            <h4 className='text-danger'>Wait List</h4>
          )}
          <div className='row'>
            <p className='lead text-green-500 font-bold'>
              <b>{props.book?.copies} </b>
              copies
            </p>
            <p className='col-6 lead text-red-500 font-bold'>
              <b>{props.book?.copiesAvailable} </b>
              available
            </p>
          </div>
        </div>
        {/* <Link to='/#' className='btn btn-success btn-lg'>
          Sign in
        </Link> */}
        {buttonRender()}
        <hr />
        <p className='mt-3'>
          This number can change until placing order has been complete
        </p>
        {reviewRender()}
      </div>
    </div>
  );
};
