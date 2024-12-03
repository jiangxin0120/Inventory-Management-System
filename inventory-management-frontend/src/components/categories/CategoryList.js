import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-2xl font-bold mb-4">Category List</h1>
      <button onClick={() => navigate('/dashboard')} className="btn btn-secondary mb-3">Back to Dashboard</button>
      <ul className="list-group">
        {categories.map((category) => (
          <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
            {category.CategoryName}
            <Link to={`/categories/edit/${category.id}`} className="btn btn-warning btn-sm">Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
