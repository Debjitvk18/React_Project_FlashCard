import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

   
    if (username === 'admin' && password === 'password123') {
      navigate('/Dashboard'); 
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='w-[300px] p-6 bg-white rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Admin Login</h2>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <label className='block mb-1'>Username</label>
            <input
              type='text'
              className='w-full p-2 border border-gray-300 rounded'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-1'>Password</label>
            <input
              type='password'
              className='w-full p-2 border border-gray-300 rounded'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type='submit'
            className='w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700'
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
