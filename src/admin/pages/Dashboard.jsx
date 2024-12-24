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
      setTotalOrders(res.data.length);
      setTotalRevenue(
        res.data.reduce((total, order) => total + order.total, 0)
      );
    }
    );
  }, []);

  return (

    <>
        <AdminNavbar/>



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

        {/* Feedback Section */}
        {/* <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Feedback</h2>
          {data.feedback.length > 0 ? (
            <ul className="space-y-4">
              {data.feedback.map((feedback, index) => (
                <li
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg shadow border border-gray-200"
                >
                  <p className="text-gray-800 font-semibold">{feedback.user}</p>
                  <p className="text-gray-600">{feedback.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No feedback available.</p>
          )}
        </div> */}
      </div>
    </div>

</>
  );
};

export default Dashboard;
