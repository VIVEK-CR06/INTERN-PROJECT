// src/components/ManageUsers.js

import React, { useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';

const ManageUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', isActive: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Customer', isActive: true },
    { id: 3, name: 'Mark Johnson', email: 'mark@example.com', role: 'Vendor', isActive: false },
  ]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');

  const handleEditUser = (id) => {
    const userToEdit = users.find(user => user.id === id);
    setUserName(userToEdit.name);
    setUserEmail(userToEdit.email);
    setUserRole(userToEdit.role);
    setEditingUserId(id);
  };

  const handleSaveEdit = () => {
    setUsers(users.map(user =>
      user.id === editingUserId
        ? { ...user, name: userName, email: userEmail, role: userRole }
        : user
    ));
    setEditingUserId(null);
    setUserName('');
    setUserEmail('');
    setUserRole('');
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleToggleActive = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, isActive: !user.isActive } : user
    ));
  };

  return (

    <>
    <AdminNavbar/>

    <div className="p-4 space-y-4">
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Manage Users</h2>
        {editingUserId && (
          <div className="flex space-x-4">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="User Name"
              className="p-2 border border-gray-300 rounded-md"
            />
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="User Email"
              className="p-2 border border-gray-300 rounded-md"
            />
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="Customer">Customer</option>
              <option value="Vendor">Vendor</option>
              <option value="Admin">Admin</option>
            </select>
            <button
              onClick={handleSaveEdit}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {users.map(user => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-md"
          >
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-gray-500">Role: {user.role}</p>
              {user.isActive ? (
                <span className="text-green-500 font-semibold">Blocked</span>
              ) : (
                <span className="text-red-500 font-semibold"></span>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditUser(user.id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md"
              >
                Delete
              </button>
              <button
                onClick={() => handleToggleActive(user.id)}
                className={`${
                  user.isActive ? 'bg-gray-500' : 'bg-blue-500'
                } text-white px-3 py-1 rounded-md`}
              >
                {user.isActive ? 'Unblock' : 'block'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ManageUsers;
