import React from 'react';
import { Link } from 'react-router-dom';

export const ExploreTopBooks = () => {
  return (
    //adds our picture from the app.css
    <div className='p-20 mb-4 bg dark header '>
      <div className='max-w-full py-5 text-white flex justify-center items-center'>
        <div>
          <h1 className='text-6xl font-bold mb-4'>Open your mind</h1>
          <p className='grid-cols-md-6 text-2xl mb-5 text-yellow-400'>
            What would you like to learn?
          </p>
          <Link
            type='button'
            to='/search'
            className='bg-black text-white rounded-lg hover:bg-gray-500 pt-2
            pb-2 pl-4 pr-4'
          >
            <h3>Explore Top Books</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};
