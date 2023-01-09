import React from 'react';
import ReviewModel from '../..//models/ReviewModel';

import { StarsReview } from './/StarsReview';

export const Review: React.FC<{ review: ReviewModel }> = (props) => {
  // Sret up the date inforamtion
  const date = new Date(props.review.date);
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  return (
    <div>
      <div className='col-sm-8 col-md-8'>
        <h5 className='text-xl text-red-400'>{props.review.userEmail}</h5>
        <div className='row font-bold'>
          <div className='col text-xs mt-1'>{formattedDate}</div>
          <div className='col'>
            <StarsReview rating={props.review.rating} size={16} />
          </div>
        </div>
        <div className='mt-3 mb-4'>
          <p className='text-lg'>{props.review.reviewDescription}</p>
        </div>
      </div>
      <hr />
    </div>
  );
};
