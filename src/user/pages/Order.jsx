import React, {useEffect,useState} from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { fetchOrderById } from "../../api/OrderApi";

const Order = () => {
    const [ Orders, setOrders] = useState([]);
    const userId = localStorage.getItem("user");

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetchOrderById(userId);
                setOrders(response.data);
            }
            catch(error){
                console.error(error)
            }
        }
        fetchCart();
    }, []);

    return (

      <>
        <Navbar/>

        <div className="bg-gray-100 min-h-screen p-6">
            <div className="container mx-auto max-w-6xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h1>

                {Orders.length === 0 ? (
                    <p className="text-gray-600">No orders found.</p>
                ) : (
                    <div className="space-y-6">
                        {Orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        Order ID: {order.id}
                                    </h2>
                                    <p
                                        className={`text-sm font-medium ${
                                            order.status === "Delivered"
                                                ? "text-green-600"
                                                : "text-yellow-600"
                                        }`}
                                    >
                                        {order.status}
                                    </p>
                                </div>
                                <p className="text-gray-600 mb-2">
                                    <span className="font-medium">Order Date:</span> {order.date}
                                </p>
                                <p className="text-gray-600 mb-4">
                                    <span className="font-medium">Total:</span> {order.total}
                                </p>

                                {/* Order Items */}
                                <div className="space-y-2">
                                    {order.products.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between text-gray-700"
                                        >
                                            <p>
                                                {item.name} <span className="text-sm text-gray-500">x{item.quantity}</span>
                                            </p>
                                            <p>₹{item.price}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* View Details Button */}
                                <div className="mt-4">
                                    <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
          
            <Footer/>
        </>
    );
};

export default Order;
