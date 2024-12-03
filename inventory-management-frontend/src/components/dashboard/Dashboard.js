import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await api.get('/api/products');
        const categoriesResponse = await api.get('/api/categories');
        const usersResponse = await api.get('/api/users');

        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Dashboard</h1>

      <div className="mb-4">
        <h2>Products</h2>
        <button onClick={() => navigate('/products/new')} className="btn btn-success mb-2">Add Product</button>
        <ul className="list-group">
          {products.map(product => (
            <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
              {product.Name}
              <button onClick={() => navigate(`/products/edit/${product.id}`)} className="btn btn-warning btn-sm">Edit</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h2>Categories</h2>
        <button onClick={() => navigate('/categories/new')} className="btn btn-success mb-2">Add Category</button>
        <ul className="list-group">
          {categories.map(category => (
            <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
              {category.CategoryName}
              <button onClick={() => navigate(`/categories/edit/${category.id}`)} className="btn btn-warning btn-sm">Edit</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h2>Users</h2>
        <button onClick={() => navigate('/users/new')} className="btn btn-success mb-2">Add User</button>
        <ul className="list-group">
          {users.map(user => (
            <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
              {user.Username}
              <button onClick={() => navigate(`/users/edit/${user.id}`)} className="btn btn-warning btn-sm">Edit</button>
            </li>
          ))}
        </ul>
      </div>

      <button 
        onClick={handleLogout} 
        className="btn btn-danger"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
