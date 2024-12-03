import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6">Category List</h1>
      <ul className="bg-white rounded shadow-md w-full max-w-md">
        {categories.map((category) => (
          <li key={category.CategoryID} className="border-b border-gray-200 p-4 hover:bg-gray-100">
            {category.CategoryName} - {category.Description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
