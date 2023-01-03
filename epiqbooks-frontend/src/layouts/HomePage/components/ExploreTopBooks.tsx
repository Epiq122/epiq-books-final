import React from 'react';
import { Link } from 'react-router-dom';

export const ExploreTopBooks = () => {
  return (
    //adds our picture from the app.css
    <div className='p-5 mb-4 bg dark header'>
      <div className='container-fluid py-5 text-white d-flex justify-content-center align-item-center'>
        <div>
          <h1 className='display-5 fw-bold'>Open your mind</h1>
          <p className='row-cols-md-6 fs-5'>What would you like to learn?</p>
          <Link
            type='button'
            to='/search'
            className='btn bg-black  btn-lg text-white'
          >
            Explore our top books
          </Link>
        </div>
      </div>
    </div>
  );
};
