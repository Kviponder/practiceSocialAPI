import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { MUTATION_LOGIN } from '../utils/mutations'; // Your mutation query

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { loading, error }] = useMutation(MUTATION_LOGIN);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: { email, password },
      });

      // Handle successful login, e.g., store token and redirect user
      console.log('Login successful:', data.login.token);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="flex-center">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="form-button" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
          {error && <p className="form-error">Error: {error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
