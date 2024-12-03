import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

const CategoryForm = () => {
  const { id } = useParams(); // Get the `id` from the route params
  const [formData, setFormData] = useState({
    CategoryName: '',
    Description: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch category data for editing
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
        await api.put(`/api/categories/${id}`, formData); // Update existing category
      } else {
        await api.post('/api/categories', formData); // Create new category
      }
      navigate('/categories');
    } catch (err) {
      console.error('Error saving category:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Category' : 'Create Category'}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <input
          type="text"
          name="CategoryName"
          placeholder="Category Name"
          value={formData.CategoryName}
          onChange={handleChange}
          className="border border-gray-300 p-2 mb-4 w-full rounded"
        />
        <textarea
          name="Description"
          placeholder="Description"
          value={formData.Description}
          onChange={handleChange}
          className="border border-gray-300 p-2 mb-4 w-full rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
