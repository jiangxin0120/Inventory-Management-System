import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

const CategoryForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    CategoryName: '',
    Description: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/api/categories/${id}`).then((response) => setFormData(response.data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/api/categories/${id}`, formData);
      } else {
        await api.post('/api/categories', formData);
      }
      navigate('/categories');
    } catch (err) {
      console.error('Error saving category:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Category' : 'Create Category'}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        <div className="mb-3">
          <label className="form-label" htmlFor="CategoryName">Category Name</label>
          <input
            type="text"
            name="CategoryName"
            id="CategoryName"
            placeholder="Category Name"
            value={formData.CategoryName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="Description">Description</label>
          <textarea
            name="Description"
            id="Description"
            placeholder="Description"
            value={formData.Description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
