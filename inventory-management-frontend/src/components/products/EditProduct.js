import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

const EditProduct = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    Name: '',
    CategoryId: '',
    QuantityInStock: 0,
    Price: 0.0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Editing product with ID:", id);
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/api/products/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/products/${id}`, formData);
      navigate('/products');
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        <div className="mb-3">
          <label className="form-label" htmlFor="Name">Product Name</label>
          <input
            type="text"
            name="Name"
            id="Name"
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
            value={formData.Price}
            onChange={handleChange}
            step="0.01"
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default EditProduct; 