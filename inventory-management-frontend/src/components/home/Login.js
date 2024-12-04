import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.Username && formData.Password) {
      localStorage.setItem('token', 'dummy-token');
      navigate('/dashboard');
    } else {
      setError('Please enter both username and password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h2 className="text-3xl font-bold mb-6">Login</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Username">
            Username
          </label>
          <input
            type="text"
            name="Username"
            id="Username"
            placeholder="Enter your username"
            value={formData.Username}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Password">
            Password
          </label>
          <input
            type="password"
            name="Password"
            id="Password"
            placeholder="Enter your password"
            value={formData.Password}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
