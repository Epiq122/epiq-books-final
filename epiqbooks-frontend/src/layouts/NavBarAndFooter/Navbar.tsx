import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark py-3'>
      {/*cuts off the corners of the page a little bit*/}
      <div className='container-fluid'>
        <span className='navbar-brand'>Epiq Books</span>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavDropDown'
          aria-controls='navbarNavDropDown'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='navbar-collapse' id='navbarNavDropDown'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/search'>
                Search Books
              </Link>
            </li>
          </ul>
          <ul className='navbar-nav ms-auto navbar-dark bg-dark'>
            <li className='nav-item m-1'>
              <Link type='button' className='btn btn-outline-light' to='#'>
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
