import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/home/Login';
import Register from './components/home/Register';
import Dashboard from './components/dashboard/Dashboard';
import ProductForm from './components/products/ProductForm';
import ProductList from './components/products/ProductList';
import CategoryForm from './components/categories/CategoryForm';
import CategoryList from './components/categories/CategoryList';
import UserForm from './components/users/UserForm';
import UserList from './components/users/UserList';
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

          {/* Products */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />

          {/* Categories */}
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/new" element={<CategoryForm />} />
          <Route path="/categories/edit/:id" element={<EditCategory />} />

          {/* Users */}
          <Route path="/users" element={<UserList />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
