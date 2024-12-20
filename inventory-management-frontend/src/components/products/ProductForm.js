import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

const ProductForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    Name: '',
    CategoryId: '',
    QuantityInStock: 0,
    Price: 0.0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
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
        await api.put(`/api/products/${id}`, formData);
      } else {
        await api.post('/api/products', formData);
      }
      navigate('/products');
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Product' : 'Create Product'}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        <div className="mb-3">
          <label className="form-label" htmlFor="Name">Product Name</label>
          <input
            type="text"
            name="Name"
            id="Name"
            placeholder="Product Name"
            value={formData.Name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="CategoryId">Category ID</label>
          <input
            type="text"
            name="CategoryId"
            id="CategoryId"
            placeholder="Category ID"
            value={formData.CategoryId}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="QuantityInStock">Quantity in Stock</label>
          <input
            type="number"
            name="QuantityInStock"
            id="QuantityInStock"
            placeholder="Quantity in Stock"
            value={formData.QuantityInStock}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="Price">Price</label>
          <input
            type="number"
            name="Price"
            id="Price"
            placeholder="Price"
            value={formData.Price}
            onChange={handleChange}
            step="0.01"
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

export default ProductForm;
