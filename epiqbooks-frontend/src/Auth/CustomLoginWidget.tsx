import React, { useState, FormEvent } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
interface LoginResponse {
  token: string;
}

const CustomLoginWidget: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const responseData: LoginResponse = await response.json();
      login(responseData.token);
    } catch (err) {
      setError(err.message);
    }
  };

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
