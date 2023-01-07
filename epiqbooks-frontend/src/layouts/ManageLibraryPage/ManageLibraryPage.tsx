import { useOktaAuth } from '@okta/okta-react/';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AdminMessages } from './components/AdminMessages';

export const ManageLibraryPage = () => {
  const { authState } = useOktaAuth();

  const [changeQuantityOfBooksClicked, setChangeQuantityOfBooksClicked] =
    useState(false);
  const [messagesClick, setMessagesClick] = useState(false);

  function addBookClickHandler() {
    setChangeQuantityOfBooksClicked(false);
    setMessagesClick(false);
  }
  function changeQuantityOfBooksClickHandler() {
    setChangeQuantityOfBooksClicked(true);
    setMessagesClick(false);
  }

  function messagesClickHandler() {
    setChangeQuantityOfBooksClicked(false);
    setMessagesClick(true);
  }

  // Checks the user type
  if (authState?.accessToken?.claims.userType === undefined) {
    return <Redirect to='/home' />;
  }

  return (
    <div className='container'>
      <div className='mt-5'>
        <nav>
          <div className='nav nav-tabs' id='nav-tab' role='tablist'>
            <button
              onClick={addBookClickHandler}
              className='nav-link active'
              id='nav-add-book-tab'
              data-bs-toggle='tab'
              data-bs-target='#nav-add-book'
              type='button'
              role='tab'
              aria-controls='nav-add-book'
              aria-selected='false'
            >
              Add New Book
            </button>
            <button
              onClick={changeQuantityOfBooksClickHandler}
              className='nav-link'
              id='nav-quantity-tab'
              data-bs-toggle='tab'
              data-bs-target='#nav-quantity'
              type='button'
              role='tab'
              aria-controls='nav-quantity'
              aria-selected='true'
            >
              Change Quantity of Books
            </button>
            <button
              onClick={messagesClickHandler}
              className='nav-link'
              id='nav-messages-tab'
              data-bs-toggle='tab'
              data-bs-target='#nav-messages'
              type='button'
              role='tab'
              aria-controls='nav-messages'
              aria-selected='false'
            >
              Messages
            </button>
          </div>
        </nav>
        <div className='tab-contnent' id='nav-tabContent'>
          <div
            className='tab-pane fade show active'
            id='nav-add-book'
            role='tabpanel'
            aria-labelledby='nav-add-book-tab'
          >
            Add New Book
          </div>
          <div
            className='tab-pane fade'
            id='nav-quantity'
            role='tabpanel'
            aria-labelledby='nav-quantity-tab'
          >
            {changeQuantityOfBooksClicked ? <>Change Quantity</> : <></>}
          </div>
          <div
            className='tab-pane fade'
            id='nav-messages'
            role='tabpanel'
            aria-labelledby='nav-messages-tab'
          >
            {messagesClick ? <AdminMessages /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};
