import BookModel from '../../..//models/BookModel';
import React from 'react';
// import python image

import { Link } from 'react-router-dom';

export const ReturnBook: React.FC<{ book: BookModel }> = (props) => {
  return (
    <div className='w-full md:w-1/4 lg:w-1/3 xl:w-1/4 px-4 mb-4'>
      <div className='text-center text-white'>
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
          <Link
            className='btn btn-primary text-white bg-black hover:bg-gray-500 border-black mt-4 px-3'
            to={`checkout/${props.book.id}`}
          >
            Reserve
          </Link>
        </div>
      </div>
    </div>
  );
};
