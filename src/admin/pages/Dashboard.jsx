import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";

const Dashboard = () => {
  const [data, setData] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    todaysOrders: 0,
    pendingOrders: 0,
    shippedOrders: 0,
    todaysRevenue: 0,
    feedback: [],
  });

  useEffect(() => {
    // Replace with API calls to fetch dashboard data
    const fetchData = async () => {
      const mockData = {
        totalUsers: 1023,
        totalProducts: 245,
        totalOrders: 534,
        totalRevenue: 82345,
        todaysOrders: 12,
        pendingOrders: 20,
        shippedOrders: 500,
        todaysRevenue: 3456,
        feedback: [
          { user: "John Doe", comment: "Great service!" },
          { user: "Jane Smith", comment: "Fast delivery, loved it!" },
        ],
      };
      setData(mockData);
    };
    fetchData();
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
            <p className="text-3xl font-bold text-blue-600">{data.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800">Total Products</h2>
            <p className="text-3xl font-bold text-green-600">{data.totalProducts}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800">Total Orders</h2>
            <p className="text-3xl font-bold text-purple-600">{data.totalOrders}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800">Total Revenue</h2>
            <p className="text-3xl font-bold text-red-600">₹{data.totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800">Today's Orders</h2>
            <p className="text-3xl font-bold text-yellow-600">{data.todaysOrders}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800">Pending Orders</h2>
            <p className="text-3xl font-bold text-orange-600">{data.pendingOrders}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800">Shipped Orders</h2>
            <p className="text-3xl font-bold text-indigo-600">{data.shippedOrders}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800">Today's Revenue</h2>
            <p className="text-3xl font-bold text-teal-600">₹{data.todaysRevenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
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
        </div>
      </div>
    </div>

</>
  );
};

export default Dashboard;
