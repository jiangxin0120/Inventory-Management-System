import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <button onClick={() => navigate('/dashboard')} className="btn btn-secondary mb-3">Back to Dashboard</button>
      <ul className="list-group">
        {products.map((product) => (
          <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
            {product.Name}
            <Link to={`/products/edit/${product.id}`} className="btn btn-warning btn-sm">Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
