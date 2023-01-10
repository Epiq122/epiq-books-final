import { useOktaAuth } from '@okta/okta-react/';
import { useEffect, useState } from 'react';
import MessageModel from '../../../models/MessageModel';
import { LoadingSpinner } from '../../Utils/LoadingSpinner';
import { MessagesPage } from '../MessagesPage';
import { Pagination } from '../../Utils/Pagination';

export const Messages = () => {
  const { authState } = useOktaAuth();
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [httpError, setHttpError] = useState(null);

  //Messages
  const [messages, setMessages] = useState<MessageModel[]>([]);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchUserMessages = async () => {
      if (authState && authState?.isAuthenticated) {
        const url = `http://localhost:8080/api/messages/search/findByUserEmail/?userEmail=${
          authState?.accessToken?.claims.sub
        }&page=${currentPage - 1}&size=${messagesPerPage}`;
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            'Content-Type': 'application/json',
          },
        };
        const messagesResponse = await fetch(url, requestOptions);
        if (!messagesResponse.ok) {
          throw new Error('Something went wrong!');
        }
        const messagesResponseJson = await messagesResponse.json();
        setMessages(messagesResponseJson._embedded.messages);
        setTotalPages(messagesResponseJson.page.totalPages);
      }
      setIsLoadingMessages(false);
    };
    fetchUserMessages().catch((error: any) => {
      setIsLoadingMessages(false);
      setHttpError(error.messages);
    });
    window.scrollTo(0, 0);
  }, [authState, currentPage]);

  if (isLoadingMessages) {
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
    <div className='mt-'>
      {messages.length > 0 ? (
        <div>
          <h5 className='text-white'>Current Q/A: </h5>
          {messages.map((message) => (
            <div key={message.id}>
              <div className='card mt-2 shadow p-3 bg-body rounded bg-gray-400'>
                <h5 className='mb-2 text-white font-bold'>
                  Case #{message.id}: {message.title}
                </h5>
                <h6 className='text-amber-200' mb-2>
                  {message.userEmail}
                </h6>
                <p className='mt-2 text-stone-800 text-2xl'>
                  {message.question}
                </p>
                <hr className='mt-2' />
                <div>
                  <h5 className='mb-2 mt-2 font-bold'>Response: </h5>
                  {message.response && message.adminEmail ? (
                    <>
                      <h6 className='font-bold text-green-200'>
                        {message.adminEmail} (admin)
                      </h6>
                      <p className='text-rose-900 font-bold'>
                        {message.response}
                      </p>
                    </>
                  ) : (
                    <p className='mt-2'>
                      <i className='text-rose-900 font-bold'>
                        Pending response from administration. Please be patient.
                      </i>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h5 className='text-white mt-3'>
          All questions you submit will be shown here
        </h5>
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
