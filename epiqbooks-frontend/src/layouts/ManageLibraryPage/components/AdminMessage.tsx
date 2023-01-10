// this is going to be a child component of our of our Admin Messages

import { useState } from 'react';
import MessageModel from '../../../models/MessageModel';

export const AdminMessage: React.FC<{
  message: MessageModel;
  submitResponseToQuestion: any;
}> = (props, key) => {
  const [displayWarning, setDisplayWarning] = useState(false);
  const [response, setResponse] = useState('');

  function submitBtn() {
    if (props.message.id !== null && response !== '') {
      props.submitResponseToQuestion(props.message.id, response);
      setDisplayWarning(false);
    } else {
      setDisplayWarning(true);
    }
  }

  return (
    <div key={props.message.id}>
      <div className='card mt-2 shadow p-3 bg-body rounded bg-gray-400'>
        <h5 className='mb-2 text-white font-bold'>
          Case #{props.message.id} : {props.message.title}
        </h5>
        <h6 className='text-amber-200' mb-2>
          {props.message.userEmail}
        </h6>
        <p className='mt-2 text-stone-800 text-2xl'>{props.message.question}</p>
        <hr className='mt-2' />
        <div>
          <h5 className='mb-2 mt-2 font-bold'>Response: </h5>
          <form action='PUT'>
            {displayWarning && (
              <div className='alert alert-danger' role='alert'>
                All fields must be filled out.
              </div>
            )}
            <div className='col-md-12 mb-3'>
              <label className='form-label'> Description </label>
              <textarea
                className='form-control'
                id='exampleFormControlTextarea1'
                rows={3}
                onChange={(e) => setResponse(e.target.value)}
                value={response}
              ></textarea>
            </div>
            <div>
              <button
                type='button'
                className='btn mt-3 bg-blue-600 text-white font-bold hover:bg-blue-400'
                onClick={submitBtn}
              >
                Submit Response
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
