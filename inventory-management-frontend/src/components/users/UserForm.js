import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

const UserForm = () => {
  const { id } = useParams(); // Get the `id` from the route params
  const [formData, setFormData] = useState({ Username: '', Email: '', Password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch user data for editing
      api.get(`/users/${id}`).then((response) => setFormData(response.data));
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
        await api.put(`/users/${id}`, formData); // Update existing user
      } else {
        await api.post('/users', formData); // Create new user
      }
      navigate('/users');
    } catch (err) {
      console.error('Error saving user:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit User' : 'Create User'}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <input
          type="text"
          name="Username"
          placeholder="Username"
          value={formData.Username}
          onChange={handleChange}
          className="border border-gray-300 p-2 mb-4 w-full rounded"
        />
        <input
          type="email"
          name="Email"
          placeholder="Email"
          value={formData.Email}
          onChange={handleChange}
          className="border border-gray-300 p-2 mb-4 w-full rounded"
        />
        <input
          type="password"
          name="Password"
          placeholder="Password"
          value={formData.Password}
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

export default UserForm;
