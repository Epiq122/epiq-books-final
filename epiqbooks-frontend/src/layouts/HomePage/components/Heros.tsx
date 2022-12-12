import React from 'react';
import { Link } from 'react-router-dom';

export const Heros = () => {
  return (
    <div>
      <div className='d-none d-lg-block'>
        <div className='row g-0 mt-5'>
          <div className='col-sm-6 col-md-6'>
            <div className='col-image-left'></div>
          </div>
          <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
            <div className='ml-2'>
              <h1>What have you been reading?</h1>
              <p className='lead'>
                The team here at Epiq Books would love to know what your
                learning. Are you learning a new language? Are you learning a
                new framework? Are you learning a new to programming? Let us
                know what you are learning and we will help you find the best
                books to help you learn.
              </p>

              <a
                className='btn bg-black btn-lg text-white '
                href='epiqbooks-frontend/next-frontend/layouts/HomePage#'
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
        <div className='row g-0'>
          <div
            className='col-4 col-md-4 container d-flex
                        justify-content-center align-items-center'
          >
            <div className='ml-2'>
              <h1>Our collection is always changing!</h1>
              <p className='lead'>
                Make sure to checkout our collection as tech is always changing!
                We look to provide the best and up to date books for you to
                learn from. Carefully chosen , our selection is the best around.
              </p>
            </div>
          </div>
          <div className='col-sm-6 col-md-6'>
            <div className='col-image-right'></div>
          </div>
        </div>
      </div>

      {/* Mobile Heros */}
      <div className='d-lg-none'>
        <div className='container'>
          <div className='m-2'>
            <div className='col-image-left'></div>
            <div className='mt-2'>
              <h1>What have you been reading?</h1>
              <p className='lead'>
                The team here at Epiq Books would love to know what your
                learning. Are you learning a new language? Are you learning a
                new framework? Are you learning a new to programming? Let us
                know what you are learning and we will help you find the best
                books to help you learn
              </p>

              <Link
                className='btn bg-black btn-lg text-white'
                to='epiqbooks-frontend/next-frontend/layouts/HomePage#'
              >
                Sign up
              </Link>
            </div>
          </div>
          <div className='m-2'>
            <div className='col-image-right'></div>
            <div className='mt-2'>
              <h1>Our collection is always changing!</h1>
              <p className='lead'>
                Make sure to checkout our collection as tech is always changing!
                We look to provide the best and up to date books for you to
                learn from. Carefully chosen , our selection is the best around.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
