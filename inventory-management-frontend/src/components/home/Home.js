import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Inventory Management System</h1>
      <div className="space-x-4">
        <Link to="/login">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-200">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
