// This is going to be a piece of our DOM thats going to render out two different options, to post a message and to see all the messages the user currenty sent out

import { useState } from 'react';
import { PostNewMessage } from './components/PostNewMessage';
import { Messages } from './components/Messages';

export const MessagesPage = () => {
  const [messagesClick, setMessagesClick] = useState(false);

  return (
    <div className='container'>
      <div className='mt-3 mb-2'>
        <nav>
          <div className='nav nav-tabs' id='nav-tab' role='tablist'>
            <button
              onClick={() => setMessagesClick(false)}
              className='nav-link active  text-black border-blue-700 py-2 px-4 border'
              id='nav-send-message-tab'
              data-bs-toggle='tab'
              data-bs-target='#nav-send-message'
              type='button'
              role='tab'
              aria-controls='nav-send-message'
              aria-selected='true'
            >
              Submit Question
            </button>
            <button
              onClick={() => setMessagesClick(true)}
              className='nav-link  hover:bg-gray-900 text-black font-bold py-2 px-4 border border-blue-700 rounded
'
              id='nav-send-message-tab'
              data-bs-toggle='tab'
              data-bs-target='#nav-message'
              type='button'
              role='tab'
              aria-controls='nav-message'
              aria-selected='false'
            >
              Reponse Pending
            </button>
          </div>
        </nav>
        <div className='tab-content' id='nav-tabContent'>
          <div
            className='tab-pane fade show active'
            id='nav-send-message'
            role='tabpanel'
            aria-labelledby='nav-send-message-tab'
          >
            <PostNewMessage />
          </div>
          <div
            className='tab-pane fade'
            id='nav-message'
            role='tabpanel'
            aria-labelledby='nav-message-tab'
          >
            {messagesClick ? <Messages /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};
