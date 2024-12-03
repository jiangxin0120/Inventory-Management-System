import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

const ProductForm = () => {
  const { id } = useParams(); // Get the `id` from the route params
  const [formData, setFormData] = useState({
    Name: '',
    CategoryId: '',
    QuantityInStock: 0,
    Price: 0.0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch product data for editing
      api.get(`/api/products/${id}`).then((response) => setFormData(response.data));
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
        await api.put(`/api/products/${id}`, formData); // Update existing product
      } else {
        await api.post('/api/products', formData); // Create new product
      }
      navigate('/products');
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Product' : 'Create Product'}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <input
          type="text"
          name="Name"
          placeholder="Product Name"
          value={formData.Name}
          onChange={handleChange}
          className="border border-gray-300 p-2 mb-4 w-full rounded"
        />
        <input
          type="text"
          name="CategoryId"
          placeholder="Category ID"
          value={formData.CategoryId}
          onChange={handleChange}
          className="border border-gray-300 p-2 mb-4 w-full rounded"
        />
        <input
          type="number"
          name="QuantityInStock"
          placeholder="Quantity in Stock"
          value={formData.QuantityInStock}
          onChange={handleChange}
          className="border border-gray-300 p-2 mb-4 w-full rounded"
        />
        <input
          type="number"
          name="Price"
          placeholder="Price"
          value={formData.Price}
          onChange={handleChange}
          step="0.01"
          className="border border-gray-300 p-2 mb-4 w-full rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
