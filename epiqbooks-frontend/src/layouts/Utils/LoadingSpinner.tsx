// This is a component that displays a loading spinner
import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className='d-flex justify-content-center'>
      <div className='spinner-border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  );
};
