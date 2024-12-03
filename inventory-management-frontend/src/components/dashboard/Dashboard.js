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

        console.log('Products:', productsResponse.data); // Debug log
        console.log('Categories:', categoriesResponse.data); // Debug log
        console.log('Users:', usersResponse.data); // Debug log

        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/api/products/${id}`);
        setProducts(products.filter(product => product.ProductId !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await api.delete(`/api/categories/${id}`);
        setCategories(categories.filter(category => category.CategoryId !== id));
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/api/users/${id}`);
        setUsers(users.filter(user => user.UserId !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleEditProduct = (id) => {
    console.log('Editing product with ID:', id); // Debug log
    navigate(`/products/edit/${id}`);
  };

  const handleEditCategory = (categoryId) => {
    console.log('Editing category with ID:', categoryId);
    if (categoryId) {
      navigate(`/categories/edit/${categoryId}`);
    } else {
      console.error('Invalid category ID');
      alert('Unable to edit category');
    }
  };

  const handleEditUser = (id) => {
    console.log('Editing user with ID:', id); // Debug log
    navigate(`/users/edit/${id}`);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Dashboard</h1>

      <div className="mb-4">
        <h2>Products</h2>
        <button onClick={() => navigate('/products/new')} className="btn btn-success mb-2">Add Product</button>
        <ul className="list-group">
          {products.map(product => (
            <li key={product.ProductId} className="list-group-item d-flex justify-content-between align-items-center">
              {product.Name}
              <div>
                <button onClick={() => handleEditProduct(product.ProductId)} className="btn btn-warning btn-sm">Edit</button>
                <button onClick={() => handleDeleteProduct(product.ProductId)} className="btn btn-danger btn-sm ms-2">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h2>Categories</h2>
        <button onClick={() => navigate('/categories/new')} className="btn btn-success mb-2">Add Category</button>
        <ul className="list-group">
          {categories.map(category => {
            console.log('Rendering category:', category); // Debug log
            return (
              <li key={category.CategoryId} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <span className="fw-bold">{category.CategoryName}</span>
                  {category.Description && <p className="text-muted mb-0 small">{category.Description}</p>}
                </div>
                <div>
                  <button 
                    onClick={() => handleEditCategory(category.CategoryId)} 
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteCategory(category.CategoryId)} 
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mb-4">
        <h2>Users</h2>
        <button onClick={() => navigate('/users/new')} className="btn btn-success mb-2">Add User</button>
        <ul className="list-group">
          {users.map(user => (
            <li key={user.UserId} className="list-group-item d-flex justify-content-between align-items-center">
              {user.Username}
              <div>
                <button onClick={() => handleEditUser(user.UserId)} className="btn btn-warning btn-sm">Edit</button>
                <button onClick={() => handleDeleteUser(user.UserId)} className="btn btn-danger btn-sm ms-2">Delete</button>
              </div>
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
