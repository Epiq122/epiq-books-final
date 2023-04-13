// // This is going to make it so that we can use the pagination component in other pages

// import React from 'react';

// export const Pagination: React.FC<{
//   currentPage: number;
//   totalPages: number;
//   paginate: any;
// }> = (props) => {
//   const pageNumbers = [];

//   // this is creating the number in which the pagination is going, so we can start swapping between pages that we
//   // are currently on
//   if (props.currentPage === 1) {
//     pageNumbers.push(props.currentPage);
//     if (props.totalPages >= props.currentPage + 1) {
//       pageNumbers.push(props.currentPage + 1);
//     }
//     if (props.totalPages >= props.currentPage + 2) {
//       pageNumbers.push(props.currentPage + 2);
//     }
//   } else if (props.currentPage > 1) {
//     if (props.currentPage >= 3) {
//       pageNumbers.push(props.currentPage - 2);
//       pageNumbers.push(props.currentPage - 1);
//     } else {
//       pageNumbers.push(props.currentPage - 1);
//     }
//     pageNumbers.push(props.currentPage);

//     if (props.totalPages >= props.currentPage + 1) {
//       pageNumbers.push(props.currentPage + 1);
//     }
//     if (props.totalPages >= props.currentPage + 2) {
//       pageNumbers.push(props.currentPage + 2);
//     }
//   }
//   return (
//     <nav aria-label='...'>
//       <ul className='pagination '>
//         <li className='page-item ' onClick={() => props.paginate(1)}>
//           <button className='page-link bg-black text-white hover:bg-gray-500'>
//             First
//           </button>
//         </li>
//         {/* this renders all the middle pages   */}
//         {pageNumbers.map((number) => (
//           <li
//             key={number}
//             onClick={() => props.paginate(number)}
//             // changes our CSS property
//             className={
//               'page-item' + (props.currentPage === number ? 'active' : '')
//             }
//           >
//             <button className='page-link text-black'>{number}</button>
//           </li>
//         ))}
//         {/*    this is for the last page in  the pagination*/}
//         <li
//           className='page-item '
//           onClick={() => props.paginate(props.totalPages)}
//         >
//           <button className='page-link bg-black text-white hover:bg-gray-500'>
//             Last Page
//           </button>
//         </li>
//       </ul>
//     </nav>
//   );
// };
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(currentPage / totalPages); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='mt-3'>
      <ul className='pagination'>
        {pageNumbers.map((number) => (
          <li key={number} className='page-item'>
            <button
              onClick={() => paginate(number)}
              className='page-link'
              style={{ cursor: 'pointer' }}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
