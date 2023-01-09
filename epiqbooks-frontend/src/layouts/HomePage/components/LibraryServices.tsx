import React from 'react';
import { useOktaAuth } from '@okta/okta-react/';
import { Link } from 'react-router-dom';

export const LibraryServices = () => {
  // for our okta
  const { authState } = useOktaAuth();

  return (
    <div className='container my-5'>
      <div className='row p-4 align-items-center border shadow-lg'>
        <div className='col-lg-7 p-3'>
          <h1 className='display-4 fw-bold text-red-200'>
            Cant' find what you're looking for?
          </h1>
          <p className='lead text-white'>
            We're here to help. Our Admins are ready to assist you with your
            research needs. Simply send them a personal message and they'll get
            back to you as soon as possible.
          </p>
          <div className='d-grid gap-2 justify-content-md-start mb-4 mb-lg-3'>
            {authState?.isAuthenticated ? (
              <Link
                to='/messages'
                type='button'
                className='bg-black text-white rounded-lg hover:bg-gray-500 pt-2
            pb-2 pl-4 pr-4 mt-3'
              >
                Library Services
              </Link>
            ) : (
              <Link
                className='btn bg-black btn-lg hover:bg-gray-500 text-white mt-4'
                to='/login/'
              >
                Sign up
              </Link>
            )}
          </div>
        </div>

        <div className='col-lg-4 offset-lg-1 shadow-lg lost-image'></div>
      </div>
    </div>
  );
};
