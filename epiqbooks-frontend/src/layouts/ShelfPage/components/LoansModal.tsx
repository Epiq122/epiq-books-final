import ShelfCurrentLoans from '../../../models/ShelfCurrentLoans';

export const LoansModal: React.FC<{
  shelfCurrentLoan: ShelfCurrentLoans;
  mobile: boolean;
  returnBook: any;
  renewLoan: any;
}> = (props) => {
  return (
    // Assigns an ID to the first Div ( either mobile or desktop)
    <div
      className='modal fade'
      id={
        props.mobile
          ? `mobilemodal${props.shelfCurrentLoan.book.id}`
          : `modal${props.shelfCurrentLoan.book.id}`
      }
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      aria-hidden='true'
      key={props.shelfCurrentLoan.book.id}
    >
      <div className='modal-dialog'>
        <div className='modal-content bg-gray-700'>
          <div className='modal-header'>
            <h5
              className='modal-title text-white font-bold'
              id='staticBackdropLabel'
            >
              Loan Options
            </h5>
            <button
              type='button'
              className='btn-close  text-white'
              data-bs-dismiss='modal'
              aria-label='close'
            >
              X
            </button>
          </div>
          <div className='modal-body'>
            <div className='container'>
              <div className='mt-3'>
                <div className='row'>
                  <div className='col-2'>
                    {props.shelfCurrentLoan.book?.img ? (
                      <img
                        src={props.shelfCurrentLoan.book?.img}
                        width='56'
                        height='87'
                        alt='book'
                      />
                    ) : (
                      <img
                        src={require('../../../images/python-book.png')}
                        width='56'
                        height='87'
                        alt='book'
                      />
                    )}
                  </div>
                  <div className='col-10'>
                    <h6 className='text-red-400 '>
                      {props.shelfCurrentLoan.book.author}
                    </h6>
                    <h5 className='text-white font-bold'>
                      {props.shelfCurrentLoan.book.title}
                    </h5>
                  </div>
                </div>
                <hr className='mt-2' />
                {props.shelfCurrentLoan.daysLeft > 0 && (
                  <p className='text-secondary mt-3 text-green-600'>
                    Due in {props.shelfCurrentLoan.daysLeft} days
                  </p>
                )}
                {props.shelfCurrentLoan.daysLeft === 0 && (
                  <p className='text-success'>Due today!</p>
                )}
                {props.shelfCurrentLoan.daysLeft < 0 && (
                  <p className='text-danger'>
                    Overdue by {props.shelfCurrentLoan.daysLeft} days.
                  </p>
                )}
                <div className='list-group mt-3'>
                  <button
                    onClick={() =>
                      props.returnBook(props.shelfCurrentLoan.book.id)
                    }
                    data-bs-dismiss='modal'
                    className='list-group-item list-group-item-action  bg-amber-400 hover:bg-gray-500 text-white'
                    aria-current='true'
                  >
                    Return Book
                  </button>
                  <button
                    onClick={
                      props.shelfCurrentLoan.daysLeft < 0
                        ? (e) => e.preventDefault()
                        : () => props.renewLoan(props.shelfCurrentLoan.book.id)
                    }
                    data-bs-dismiss='modal'
                    className={
                      props.shelfCurrentLoan.daysLeft < 0
                        ? 'list-group-item list-group-item-action inactiveLink  bg-amber-600 hover:bg-gray-500 text-white'
                        : 'list-group-item list-group-item-action  bg-amber-600 hover:bg-gray-500 text-white'
                    }
                  >
                    {props.shelfCurrentLoan.daysLeft < 0
                      ? 'Overdue books cannot be renewed'
                      : 'Renew Book for 7 days'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
