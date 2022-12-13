import React from 'react';
import BookModel from '../..//models/BookModel';
// @ts-ignore
import { Link } from 'react-router-dom';

export const CheckoutAndReviewBox: React.FC<{
  book: BookModel | undefined;
  mobile: boolean;
  loansCount: number;
  isAuthenticated: any;
  isCheckedOut: boolean;
  checkOutBook: any;
}> = (props) => {
  function buttonRender() {
    if (props.isAuthenticated) {
      // check if the book isnt checked out and the loans count is less than 5
      if (!props.isCheckedOut && props.loansCount < 5) {
        return (
          <button
            onClick={() => props.checkOutBook()}
            className='btn btn-success btn-lg'
          >
            Checkout
          </button>
        );
      } else if (props.isCheckedOut) {
        return (
          <p>
            <b>Book currently checked out</b>
          </p>
        );
        // if the loans count is more than 5
      } else if (!props.isCheckedOut) {
        return <p className='text-danger'>Sorry! to many books checked out</p>;
      }
    }
    return (
      <Link to={'/login'} className='btn btn-success btn-lg'>
        Sign in
      </Link>
    );
  }
  return (
    // checks to see if the card needs to be mobile or not
    <div
      className={
        props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'
      }
    >
      <div className='card-body container'>
        <div className='mt-3'>
          <p>
            <b>{props.loansCount}/5 </b>
            books checked out
          </p>
          <hr />
          {props.book &&
          props.book.copiesAvailable &&
          props.book.copiesAvailable > 0 ? (
            <h4 className='text-sucess'>Avaliable</h4>
          ) : (
            <h4 className='text-danger'>Wait List</h4>
          )}
          <div className='row'>
            <p className='lead'>
              <b>{props.book?.copies} </b>
              copies
            </p>
            <p className='col-6 lead'>
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
        <p>Sign in to be able to leave a review</p>
      </div>
    </div>
  );
};
