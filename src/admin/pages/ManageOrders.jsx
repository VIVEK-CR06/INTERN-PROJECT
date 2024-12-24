import React, { useState, useEffect } from 'react';
import { fetchOrders } from '../../api/AdminApi';
import AdminNavbar from '../../components/AdminNavbar';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        fetchOrders().then((res) => setOrders(res.data));
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
    };

    return (

        <>
        <AdminNavbar/>
        <div className="container mx-auto py-6 px-4 max-w-7xl">
            {/* Header */}
            <h1 className="text-2xl font-bold mb-6 ">Manage Orders</h1>

            {/* Orders Grid */}
            <div className="grid grid-cols-1 gap-6">
                {orders.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="mt-2 text-gray-500">No orders found</p>
                    </div>
                ) : (
                    orders.map((order) => {
                        const { date, time } = formatDate(order.date);
                        const isExpanded = expandedOrder === order.id;

                        return (
                            <div
                                key={order.id}
                                className={`bg-white rounded-lg shadow-sm border transition-all duration-200 ${
                                    isExpanded ? 'ring-2 ring-blue-500' : 'hover:shadow-sm'
                                }`}
                            >
                                {/* Order Summary */}
                                <div className="p-6">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        {/* Product Details */}
                                        <div>
                                            <div className="flex items-center space-x-2 mb-2">
                                                <span className="font-medium text-gray-800">Order Details</span>
                                            </div>
                                            <p className="text-sm text-gray-600">ID: #{order.id}</p>
                                        </div>

                                        {/* Customer Details */}
                                        <div>
                                            <div className="flex items-center space-x-2 mb-2">
                                           
                                                <span className="font-medium text-gray-800">Customer</span>
                                            </div>
                                            <p className="text-sm text-gray-600">{order.username}</p>
                                        </div>

                                        {/* Date & Time */}
                                        <div>
                                            <div className="flex items-center space-x-2 mb-2">
                                                <span className="font-medium text-gray-800">Order Date</span>
                                            </div>
                                            <p className="text-sm text-gray-600">{date}</p>
                                            <p className="text-sm text-gray-500">{time}</p>
                                        </div>

                                        {/* Total Price */}
                                        <div>
                                            <div className="flex items-center space-x-2 mb-2">
                                                {/* <MdCurrencyRupee className="text-blue-500" /> */}
                                                <span className="font-medium text-gray-800">Total Amount</span>
                                            </div>
                                            <p className="text-lg font-semibold text-gray-800">₹{order.total}</p>
                                        </div>
                                    </div>

                                    {/* Expand/Collapse Button */}
                                    <div className="flex justify-between items-center mt-6 pt-4 border-t">
                                        <button
                                            onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                                            {isExpanded ? 'Hide Details' : 'View Details'}
                                        </button>
                                    </div>
                                </div>

                                {/* Expanded Order Details */}
                                {isExpanded && (
                                    <div className="border-t border-gray-100 bg-gray-50 p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Order Items */}
                                            <div >
                                                <h3 className="text-lg font-medium text-gray-800 mb-4">Order Items</h3>
                                                <div className="space-y-3">
                                                    {order.products.map((item, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center space-x-4 bg-gray-50 p-3 border-b border-gray-200"
                                                        >
                                                            <div className="flex-shrink-0">
                                                                <img
                                                                    src={item.image || 'https://via.placeholder.com/150'}
                                                                    alt={item.name}
                                                                    className="w-16 h-16 object-contain rounded-md"
                                                                />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-medium text-gray-800">{item.name}</p>
                                                                <p className="text-sm text-gray-500">
                                                                    Quantity: {item.quantity} × ₹{item.price}
                                                                </p>
                                                                <p className="text-sm font-medium text-gray-800">
                                                                    Subtotal: ₹{item.quantity * item.price}
                                                                </p>
                                                            </div>
                                                            
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-6">        
                                                {/* Address Details */}
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-800 mb-4">Shipping Address</h3>
                                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                                        <p className="font-medium text-gray-800">{order.address?.city}</p>
                                                    </div>
                                                </div>

                                                {/* Payment Info */}
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-800 mb-4">Payment Details</h3>
                                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                                        <p className="text-gray-600">Payment Method: {order.paymentMethod}</p>
                                                        <p className="font-medium text-gray-800 mt-2">Total Paid: ₹{order.total}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
        </>
    );
};

export default ManageOrders;