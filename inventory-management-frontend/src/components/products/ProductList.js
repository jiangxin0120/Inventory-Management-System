import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('api/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>
      <ul className="bg-white rounded shadow-md w-full max-w-md">
        {products.map((product) => (
          <li key={product.ProductId} className="border-b border-gray-200 p-4 hover:bg-gray-100">
            {product.Name} - {product.CategoryId} - ${product.Price} - Stock: {product.QuantityInStock}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
