import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

interface LoginResponse {
  token: string;
}

const CustomLoginWidget: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post<LoginResponse>(
        'http://localhost:8080/api/auth/signin',
        {
          email,
          password,
        },
      );

      localStorage.setItem('jwtToken', response.data.token);
      setLoggedIn(true);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  if (loggedIn) {
    return <Redirect to='/' />;
  }

  return (
    <div className='container mt-5 mb-5'>
      <h2>Login</h2>
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
        <button className='text-white' type='submit'>
          Login
        </button>
      </form>
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};

export default CustomLoginWidget;
