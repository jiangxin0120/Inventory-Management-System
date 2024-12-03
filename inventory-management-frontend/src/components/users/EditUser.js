import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

const EditUser = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ Username: '', Email: '', Password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Editing user with ID:", id);
    const fetchUser = async () => {
      try {
        const response = await api.get(`/api/users/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/users/${id}`, formData);
      navigate('/users');
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-2xl font-bold mb-4">Edit User</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        <div className="mb-3">
          <label className="form-label" htmlFor="Username">Username</label>
          <input
            type="text"
            name="Username"
            id="Username"
            value={formData.Username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="Email">Email</label>
          <input
            type="email"
            name="Email"
            id="Email"
            value={formData.Email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="Password">Password</label>
          <input
            type="password"
            name="Password"
            id="Password"
            value={formData.Password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default EditUser; 