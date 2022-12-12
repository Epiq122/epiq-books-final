// This is going to get each book individually and send it back to the searchbooks page
import React from 'react';
import { Link } from 'react-router-dom';
import BookModel from '../../..//models/BookModel';

export const SearchBook: React.FC<{ book: BookModel }> = (props) => {
  return (
    <div className='card mt-3 shadow p-3 mb-3 rounded' id='searchBookCard'>
      <div className='row g-0'>
        <div className='col-md-2'>
          <div className='d-none d-lg-block'>
            {/*    this is  checking to see if there is an image there, and if so return it*/}
            {props.book.img ? (
              <img
                className='mx-auto'
                src={props.book.img}
                alt='book'
                width={151}
                height={233}
              />
            ) : (
              <img
                className='mx-auto'
                src={'../../../images/python-book.png'}
                alt='book'
                width={151}
                height={233}
              />
            )}
          </div>

          {/*Mobile*/}
          <div className='d-lg-none d-flex justify-content-center align-items-center'>
            {/*    this is  checking to see if there is an image there, and if so return it*/}
            {props.book.img ? (
              <img
                className='mx-auto'
                src={props.book.img}
                alt='book'
                width={151}
                height={233}
              />
            ) : (
              <img
                className='mx-auto'
                src={'../../../images/python-book.png'}
                alt='book'
                width={151}
                height={233}
              />
            )}
          </div>
        </div>
        <div className='col-md-6'>
          <div className='card-body'>
            <h5 className='card-title'>{props.book.author}</h5>
            <h4>{props.book.title}</h4>
            <p className='card-text'>{props.book.description}</p>
          </div>
        </div>
        <div className='col-md-4 d-flex justify-content-center align-items-center'>
          <Link
            className='btn btn-md bg-black text-white'
            to={`/checkout/${props.book.id}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
