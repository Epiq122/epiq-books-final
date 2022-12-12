import BookModel from '../../..//models/BookModel';
import React from 'react';
// import python image

import { Link } from 'react-router-dom';

export const ReturnBook: React.FC<{ book: BookModel }> = (props) => {
  return (
    <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
      <div className='text-center'>
        {props.book.img ? (
          <img
            className='mx-auto'
            src={props.book.img}
            alt='python book'
            width={151}
            height={233}
          />
        ) : (
          <img
            className='mx-auto'
            src={'../../../images/python-book.png'}
            alt='python book'
            width={151}
            height={233}
          />
        )}
        <div className='my-3 mx-5'>
          <h6 className='mt-2'>{props.book.title}</h6>
          <p>{props.book.author}</p>
          <Link className='btn btn-primary text-white' to='#'>
            Reserve
          </Link>
        </div>
      </div>
    </div>
  );
};
