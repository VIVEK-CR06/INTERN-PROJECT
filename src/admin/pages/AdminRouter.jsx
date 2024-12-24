import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './admin/pages/Dashboard';
import AdminNavbar from './components/AdminNavbar';
import AdminHome from './admin/AdminHome';
import ManageProducts from './admin/pages/ManageProducts';
import ManageUsers from './admin/pages/ManageUsers';
import Reports from './admin/pages/Reports';

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/adminnavbar" element={<AdminNavbar />} />
      <Route path="/adminhome" element={<AdminHome />} />
      <Route path="/manageproduct" element={<ManageProducts />} />
      <Route path="/manageusers" element={<ManageUsers />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="*" element={<Navigate to="/dashboard" />} /> {/* Default redirect for admin */}
    </Routes>
  );
};

export default AdminRouter;
