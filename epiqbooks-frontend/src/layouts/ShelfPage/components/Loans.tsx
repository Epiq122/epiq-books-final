import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useState } from 'react';
import ShelfCurrentLoans from '../../../models/ShelfCurrentLoans';
import { LoadingSpinner } from '../../Utils/LoadingSpinner';
import { Link } from 'react-router-dom';

export const Loans = () => {
  const { authState } = useOktaAuth();
  const [httpError, setHttpError] = useState(null);

  // Current Loans State
  const [shelfCurrentLoans, setShelfCurrentLoans] = useState<
    ShelfCurrentLoans[]
  >([]);

  const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);

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
          throw new Error('Something went wrong');
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
  }, [authState]);

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

  return (
    <div>
      {/* Desktop */}
      <div className='d-none d-lg-block mt-2'>
        {/* makes sure the endpoint returns at least 1 current loan */}
        {shelfCurrentLoans.length > 0 ? (
          <>
            <h5>Current Loans: </h5>
            {shelfCurrentLoans.map((shelfCurrentLoan) => (
              <div key={shelfCurrentLoan.book.id}>
                <div className='row mt-3 mb-3'>
                  <div className='col-4 col-md-4 container'>
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
                  <div className='card col-3 col-md-3 container d-flex'>
                    <div className='card-body'>
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
                            data-bs-target={`#modal${shelfCurrentLoan.book.id}`}
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
                </div>
                <hr />
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

      {/* Mobile */}
    </div>
  );
};
