import { useState } from 'react';

export const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role }),
    });

    if (!response.ok) {
      setError('Error signing up');
      return;
    }

    // Signup successful, redirect to dashboard or home page
    window.location.href = '/dashboard';
  };

  return (
    <form onSubmit={handleSignup}>
      {error && <div>{error}</div>}
      <label>
        Username:
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        Role:
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value='USER'>User</option>
          <option value='ADMIN'>Admin</option>
        </select>
      </label>
      <button type='submit'>Signup</button>
    </form>
  );
};
