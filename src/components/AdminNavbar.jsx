import React from "react";
import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <h1 to="/admin/adminhome" className="hover:text-blue-400">
            Admin Panel
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="space-x-6">
          <NavLink
            to="/dashbord"
            className={({ isActive }) =>
              `hover:text-blue-400 ${isActive ? "text-blue-400 font-semibold" : ""}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/manageproducts"
            className={({ isActive }) =>
              `hover:text-blue-400 ${isActive ? "text-blue-400 font-semibold" : ""}`
            }
          >
            Manage Products
          </NavLink>
          <NavLink
            to="/manageusers"
            className={({ isActive }) =>
              `hover:text-blue-400 ${isActive ? "text-blue-400 font-semibold" : ""}`
            }
          >
            Manage Users
          </NavLink>
          <NavLink
            to="/manageorders"
            className={({ isActive }) =>
              `hover:text-blue-400 ${isActive ? "text-blue-400 font-semibold" : ""}`
            }
          >
            Orders
          </NavLink>
          
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
