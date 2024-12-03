import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <nav className="mb-4">
        <Link to="/products" className="text-blue-500 hover:underline">Products</Link> | 
        <Link to="/categories" className="text-blue-500 hover:underline">Categories</Link> | 
        <Link to="/users" className="text-blue-500 hover:underline">Users</Link>
      </nav>
      <button 
        onClick={handleLogout} 
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
