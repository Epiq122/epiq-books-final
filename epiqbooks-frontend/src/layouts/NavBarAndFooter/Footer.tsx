import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div className='bg-dark'>
      <footer className='container d-flex flex-wrap justify-content-between align-items-center py-5 bg-dark'>
        <p className='col-md-4 mb-0 text-white'>© Epiq Books, Inc</p>
        <ul className='nav col-md-4 justify-content-end list-unstyled d-flex'>
          <li className='nav-item'>
            <Link
              to='/'
              className='nav-link px-2 text-stone-300 hover:bg-gray-700'
            >
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/search'
              className='nav-link px-2 text-stone-300 hover:bg-gray-700'
            >
              Search Books
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};
