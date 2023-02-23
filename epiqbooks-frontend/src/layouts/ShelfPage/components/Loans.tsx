import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useState } from 'react';
import ShelfCurrentLoans from '../../../models/ShelfCurrentLoans';
import { LoadingSpinner } from '../../Utils/LoadingSpinner';
import { Link } from 'react-router-dom';
import { LoansModal } from './LoansModal';

export const Loans = () => {
  const { authState } = useOktaAuth();
  const [httpError, setHttpError] = useState(null);

  // Current Loans State
  const [shelfCurrentLoans, setShelfCurrentLoans] = useState<
    ShelfCurrentLoans[]
  >([]);
  const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);
  const [checkout, setCheckout] = useState(false);

  // Current Loans Use Effect
  useEffect(() => {
    const fetchCurrentLoans = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/api/books/secure/currentloans`;
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            'Content-Type': 'application/json',
          },
        };
        const shelfCurrentLoansResponse = await fetch(url, requestOptions);
        if (!shelfCurrentLoansResponse.ok) {
          throw new Error('Something went wrong!!! current');
        }
        const shelfCurrentLoansData = await shelfCurrentLoansResponse.json();
        setShelfCurrentLoans(shelfCurrentLoansData);
      }
      setIsLoadingUserLoans(false);
    };
    fetchCurrentLoans().catch((error: any) => {
      setHttpError(error.message);
      setIsLoadingUserLoans(false);
    });
    // scrolls to top of page
    window.scrollTo(0, 0);
  }, [authState, checkout]);

  if (isLoadingUserLoans) {
    return <LoadingSpinner />;
  }
  if (httpError) {
    return (
      <div className='container-m5'>
        <p>{httpError}</p>
      </div>
    );
  }

  async function returnBook(bookId: number) {
    const url = `http://localhost:8080/api/books/secure/return/?book=${bookId}`;
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        'Content-Type': 'application/json',
      },
    };
    const returnBookResponse = await fetch(url, requestOptions);
    if (!returnBookResponse.ok) {
      throw new Error('Something went wrong');
    }
    setCheckout(!checkout);
  }

  // Renew Loan
  async function renewLoan(bookId: number) {
    const url = `http://localhost:8080/api/books/secure/renew/loan/?book=${bookId}`;
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        'Content-Type': 'application/json',
      },
    };
    const renewLoanResponse = await fetch(url, requestOptions);
    if (!renewLoanResponse.ok) {
      throw new Error('Something went wrong / Loan cannot be renewed.');
    }
    setCheckout(!checkout);
  }

  return (
    <div>
      {/* Desktop */}
      <div className='d-none d-lg-block mt-2'>
        {/* makes sure the endpoint returns at least 1 current loan */}
        {shelfCurrentLoans.length > 0 ? (
          <>
            <h5 className='text-red-600 text-xl'>Current Loans: </h5>
            {shelfCurrentLoans.map((shelfCurrentLoan) => (
              <div key={shelfCurrentLoan.book.id}>
                <div className='row mt-3 mb-3'>
                  <div className='col-4 col-md-4 container mb-4'>
                    {shelfCurrentLoan.book?.img ? (
                      <img
                        src={shelfCurrentLoan.book?.img}
                        width='226'
                        height='349'
                        alt='book'
                      ></img>
                    ) : (
                      <img
                        src={require('../../../images/python-book.png')}
                        width='226'
                        height='349'
                        alt='book'
                      />
                    )}
                  </div>
                  <div className='card col-3 col-md-3 container d-flex mt-3 shadow px-3 mb-3 rounded py-4 bg-stone-500'>
                    <div className='card-body'>
                      <div className='mt-3'>
                        <h4 className='font-bold text-red-500'>Loan Options</h4>
                        {shelfCurrentLoan.daysLeft > 0 && (
                          <p className='text-secondary text-green-600 font-bold'>
                            Due in {shelfCurrentLoan.daysLeft} days
                          </p>
                        )}
                        {shelfCurrentLoan.daysLeft === 0 && (
                          <p className='text-success'>Due today!</p>
                        )}
                        {shelfCurrentLoan.daysLeft < 0 && (
                          <p className='text-danger'>
                            Overdue by {shelfCurrentLoan.daysLeft} days.
                          </p>
                        )}
                        <div className='list-group mt-3  '>
                          <button
                            className='list-group-item list-group-item-action bg-amber-400 hover:bg-gray-500 text-white'
                            aria-current='true'
                            data-bs-toggle='modal'
                            data-bs-target={`#modal${shelfCurrentLoan.book.id}`}
                          >
                            Manage Loan
                          </button>
                          <Link
                            to={'search'}
                            className='list-group-item list-group-item-action  bg-amber-600 hover:bg-gray-500 text-white'
                          >
                            Search more books?
                          </Link>
                        </div>
                      </div>
                      <hr />
                      <p className='mt-3'>
                        Please leave a review for this book. Your feedback is
                        appreciated!
                      </p>
                      <Link
                        className='btn bg-black hover:bg-gray-500 mt-3 text-white'
                        to={`/checkout/${shelfCurrentLoan.book.id}`}
                      >
                        Leave a Review
                      </Link>
                    </div>
                  </div>
                </div>
                <hr />
                <LoansModal
                  shelfCurrentLoan={shelfCurrentLoan}
                  mobile={false}
                  returnBook={returnBook}
                  renewLoan={renewLoan}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            <h3 className='mt-3 text-white mb-3'>
              Currently you have no books checked out
            </h3>
            <Link className='btn btn-primary' to={'search'}>
              Search for books
            </Link>
          </>
        )}
      </div>

      {/* Mobile */}
      <div className='container d-lg-none mt-2'>
        {/* makes sure the endpoint returns at least 1 current loan */}
        {shelfCurrentLoans.length > 0 ? (
          <>
            <h5 className='mb-3'>Current Loans: </h5>
            {shelfCurrentLoans.map((shelfCurrentLoan) => (
              <div key={shelfCurrentLoan.book.id}>
                <div className='d-flex justify-content-center align-items-center'>
                  {shelfCurrentLoan.book?.img ? (
                    <img
                      src={shelfCurrentLoan.book?.img}
                      width='226'
                      height='349'
                      alt='book'
                    ></img>
                  ) : (
                    <img
                      src={require('../../../images/python-book.png')}
                      width='226'
                      height='349'
                      alt='book'
                    />
                  )}
                </div>
                <div className='card d-flex mt-5 mb-3'>
                  <div className='card-body container'>
                    <div className='mt-3'>
                      <h4>Loan Options</h4>
                      {shelfCurrentLoan.daysLeft > 0 && (
                        <p className='text-secondary'>
                          Due in {shelfCurrentLoan.daysLeft} days
                        </p>
                      )}
                      {shelfCurrentLoan.daysLeft === 0 && (
                        <p className='text-success'>Due today!</p>
                      )}
                      {shelfCurrentLoan.daysLeft < 0 && (
                        <p className='text-danger'>
                          Overdue by {shelfCurrentLoan.daysLeft} days.
                        </p>
                      )}
                      <div className='list-group mt-3'>
                        <button
                          className='list-group-item list-group-item-action'
                          aria-current='true'
                          data-bs-toggle='modal'
                          data-bs-target={`#mobilemodal${shelfCurrentLoan.book.id}`}
                        >
                          Manage Loan
                        </button>
                        <Link
                          to={'search'}
                          className='list-group-item list-group-item-action'
                        >
                          Search more books?
                        </Link>
                      </div>
                    </div>
                    <hr />
                    <p className='mt-3'>
                      Please leave a review for this book. Your feedback is
                      appreciated!
                    </p>
                    <Link
                      className='btn btn-primary'
                      to={`/checkout/${shelfCurrentLoan.book.id}`}
                    >
                      Leave a Review
                    </Link>
                  </div>
                </div>

                <hr />
                <LoansModal
                  shelfCurrentLoan={shelfCurrentLoan}
                  mobile={true}
                  returnBook={returnBook}
                  renewLoan={renewLoan}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            <h3 className='mt-3'>Currently you have no books checked out</h3>
            <Link className='btn btn-primary' to={'search'}>
              Search for books
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
