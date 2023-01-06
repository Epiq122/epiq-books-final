import { useOktaAuth } from '@okta/okta-react/';
import { useState } from 'react';
import MessageModel from '../../../models/MessageModel';

export const PostNewMessage = () => {
  const { authState } = useOktaAuth();

  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');

  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  // this is the function that will be for submitting a question
  const submitQuestion = async () => {
    const url = `http://localhost:8080/api/messages/secure/add/message`;
    if (authState?.isAuthenticated && title !== '' && question !== '') {
      const messageRequestModel: MessageModel = new MessageModel(
        title,
        question
      );
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageRequestModel),
      };
      const submitNewQuestionResonse = await fetch(url, requestOptions);
      if (!submitNewQuestionResonse.ok) {
        throw new Error('Error submitting question');
      }
      setTitle('');
      setQuestion('');
      setDisplaySuccess(false);
      setDisplaySuccess(true);
    } else {
      setDisplayWarning(true);
      setDisplaySuccess(false);
    }
  };

  return (
    <div className='card mt-3'>
      {/* shows a banner when a question is added successfully */}

      <div className='card-header'>Ask question to an Epiq Books Admin</div>
      <div className='card-body'>
        <form method='POST'>
          {displayWarning && (
            <div className='alert alert-danger' role='alert'>
              Please fill out all fields
            </div>
          )}
          {displaySuccess && (
            <div className='alert alert-success' role='alert'>
              Question added successfully!
            </div>
          )}
          <div className='mb-3'>
            <label className='form-label'>Title</label>
            <input
              type='text'
              className='form-control'
              id='exampleFormControlInput1'
              placeholder='Title'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            ></input>
          </div>
          <div className='mb-3'>
            <label className='form-label'>Question</label>
            <textarea
              className='form-control'
              id='exampleFormControlTextarea1'
              rows={3}
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
            ></textarea>
          </div>
        </form>
        <button
          type='button'
          className='btn mt-3'
          id='submit-question'
          onClick={submitQuestion}
        >
          Submit Question
        </button>
      </div>
    </div>
  );
};
