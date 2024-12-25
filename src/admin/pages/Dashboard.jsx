import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { fetchOrders, fetchProducts } from "../../api/AdminApi";
import { fetchUsers } from "../../api/userApi";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetchProducts().then((res) => setTotalProducts(res.data.length));
    fetchUsers().then((res) => setTotalUsers(res.data.length));
    fetchOrders().then((res) => {
      const orders = res.data;
      setTotalOrders(orders.length);
      setTotalRevenue(
        orders.reduce((total, order) => total + order.total, 0)
      );
    });
  }, []);

  return (
    <>
      <AdminNavbar />

      <div className="bg-gray-100 min-h-screen p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Dashboard Cards */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800">Total Users</h2>
              <p className="text-3xl font-bold text-blue-600">{totalUsers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800">Total Products</h2>
              <p className="text-3xl font-bold text-green-600">{totalProducts}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800">Total Orders</h2>
              <p className="text-3xl font-bold text-purple-600">{totalOrders}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800">Total Revenue</h2>
              <p className="text-3xl font-bold text-red-600">₹{totalRevenue}</p>
            </div>
          </div>

          {/* Graph Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mockup Orders Graph */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Orders Overview</h2>
              <div className="bg-blue-100 h-48 rounded-lg relative">
                <div className="absolute bottom-0 left-0 w-full h-16 bg-blue-600" style={{ width: '60%' }}></div>
                <div className="absolute bottom-0 left-0 w-full h-12 bg-blue-400" style={{ width: '40%' }}></div>
                <div className="absolute bottom-0 left-0 w-full h-24 bg-blue-200" style={{ width: '80%' }}></div>
              </div>
            </div>

            {/* Mockup Revenue Graph */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Revenue Overview</h2>
              <div className="bg-red-100 h-48 rounded-lg relative">
                <div className="absolute bottom-0 left-0 w-full h-20 bg-red-600" style={{ width: '75%' }}></div>
                <div className="absolute bottom-0 left-0 w-full h-14 bg-red-400" style={{ width: '55%' }}></div>
                <div className="absolute bottom-0 left-0 w-full h-28 bg-red-200" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
