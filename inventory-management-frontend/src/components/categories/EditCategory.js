import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

const EditCategory = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    CategoryName: '',
    Description: '',
    CategoryId: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        console.log('Fetching category with ID:', id);
        const response = await api.get(`/api/categories/${id}`);
        console.log('Category data received:', response.data);

        // Ensure we're setting the data correctly
        const categoryData = response.data;
        setFormData({
          CategoryName: categoryData.CategoryName || '',
          Description: categoryData.Description || '',
          CategoryId: categoryData.CategoryId || id
        });
      } catch (error) {
        console.error("Error fetching category:", error);
        alert('Error loading category data');
        navigate('/dashboard');
      }
    };

    if (id) {
      fetchCategory();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting category data:', formData);
      const updateData = {
        ...formData,
        CategoryId: id // Ensure we're sending the correct ID
      };
      await api.put(`/api/categories/${id}`, updateData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error updating category:', err);
      alert('Failed to update category');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-2xl font-bold mb-4">Edit Category</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        <div className="mb-3">
          <label className="form-label" htmlFor="CategoryName">Category Name</label>
          <input
            type="text"
            name="CategoryName"
            id="CategoryName"
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
            value={formData.Description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Update</button>
          <button 
            type="button" 
            onClick={() => navigate('/dashboard')} 
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory; 