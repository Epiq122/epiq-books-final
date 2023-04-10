import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LoadingSpinner } from '../Utils/LoadingSpinner';
import CustomLoginWidget from '../../Auth/CustomLoginWidget';
import CustomSignupWidget from '../../Auth/CustomSignupWidget';
import { useAuth } from '../../Auth/AuthContext';

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <LoadingSpinner />;
  }

  const handleLogout = async () => logout();

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark py-5'>
      {/* ... */}
      <ul className='navbar-nav ms-auto navbar-dark bg-dark'>
        {isAuthenticated ? (
          <li className='nav-item m-1'>
            <Link type='button' className='btn btn-outline-light' to='/login'>
              Sign In
            </Link>
          </li>
        ) : (
          <li>
            <button className='btn btn-outline-light' onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
      {/* ... */}
    </nav>
  );
}
