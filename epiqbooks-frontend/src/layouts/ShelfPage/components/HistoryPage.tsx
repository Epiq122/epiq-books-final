import { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react/';
import HistoryModel from '../../../models/HistoryModel';
import { LoadingSpinner } from '../../Utils/LoadingSpinner';
import { Link } from 'react-router-dom';
import { Pagination } from '../../Utils/Pagination';

export const HistoryPage = () => {
  const { authState } = useOktaAuth();
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Histories
  const [histories, setHistories] = useState<HistoryModel[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchUserHistory = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/api/histories/search/findBooksByUserEmail/?userEmail=${
          authState.accessToken?.claims.sub
        }&page=${currentPage - 1}&size=5`;
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const historyResponse = await fetch(url, requestOptions);
        if (!historyResponse.ok) {
          throw new Error('Something went wrong!');
        }
        const historyResponseJson = await historyResponse.json();

        setHistories(historyResponseJson._embedded.histories);
        setTotalPages(historyResponseJson.page.totalPages);
      }
      setIsLoadingHistory(false);
    };
    fetchUserHistory().catch((error: any) => {
      setIsLoadingHistory(false);
      setHttpError(error.message);
    });
  }, [authState, currentPage]);

  if (isLoadingHistory) {
    return <LoadingSpinner />;
  }

  if (httpError) {
    return (
      <div className='container m-5'>
        <p>{httpError}</p>
      </div>
    );
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='mt-2'>
      {histories.length > 0 ? (
        <>
          <h5 className='text-white font-bold'>Recent History:</h5>

          {histories.map((history) => (
            <div key={history.id}>
              <div className='card mt-3 shadow p-3 mb-3 bg-body rounded bg-slate-500'>
                <div className='row g-0'>
                  <div className='col-md-2'>
                    <div className='d-none d-lg-block'>
                      {history.img ? (
                        <img
                          src={history.img}
                          width='123'
                          height='196'
                          alt='Book'
                        />
                      ) : (
                        <img
                          src={require('../../../images/python-book.png')}
                          width='123'
                          height='196'
                          alt='Default'
                        />
                      )}
                    </div>
                    <div className='d-lg-none d-flex justify-content-center align-items-center'>
                      {history.img ? (
                        <img
                          src={history.img}
                          width='123'
                          height='196'
                          alt='Book'
                        />
                      ) : (
                        <img
                          src={require('../../../images/python-book.png')}
                          width='123'
                          height='196'
                          alt='Default'
                        />
                      )}
                    </div>
                  </div>
                  <div className='col'>
                    <div className='card-body'>
                      <h5 className='card-title text-red-400 font-bold'>
                        {history.author}
                      </h5>
                      <h4 className='text-2xl mb-2 text-black'>
                        {history.title}
                      </h4>
                      <p className='card-text text-white mb-3'>
                        {history.description}
                      </p>
                      <hr />
                      <p className='card-text text-green-600'>
                        {' '}
                        Checked out on: {history.checkoutDate}
                      </p>
                      <p className='card-text text-rose-700'>
                        {' '}
                        Returned on: {history.returnedDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </>
      ) : (
        <>
          <h3 className='mt-3'>Currently no history: </h3>
          <Link className='btn btn-primary' to={'search'}>
            Search for new book
          </Link>
        </>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      )}
    </div>
  );
};
