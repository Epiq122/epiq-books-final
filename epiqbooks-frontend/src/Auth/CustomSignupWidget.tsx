import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

interface SignupResponse {
  message: string;
}

const CustomSignupWidget: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [signedUp, setSignedUp] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post<SignupResponse>(
        'http://localhost:8080/api/auth/signup',
        {
          email,
          password,
        },
      );

      setSignedUp(true);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  if (signedUp) {
    return <Redirect to='/login' />;
  }

  return (
    <div className='container mt-5 mb-5'>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirm Password:</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Signup</button>
      </form>
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};

export default CustomSignupWidget;
