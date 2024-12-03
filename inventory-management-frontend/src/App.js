import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/home/Login';
import Register from './components/home/Register';
import Dashboard from './components/dashboard/Dashboard';
import EditProduct from './components/products/EditProduct';
import EditCategory from './components/categories/EditCategory';
import EditUser from './components/users/EditUser';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <Routes>
          {/* Home and Auth */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Edit Routes */}
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/categories/edit/:id" element={<EditCategory />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
