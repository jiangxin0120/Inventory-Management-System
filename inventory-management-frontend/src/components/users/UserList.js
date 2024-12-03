import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6">User List</h1>
      <ul className="bg-white rounded shadow-md w-full max-w-md">
        {users.map((user) => (
          <li key={user.UserId} className="border-b border-gray-200 p-4 hover:bg-gray-100">
            {user.Username} - {user.Email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
