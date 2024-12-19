import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    const navigate = useNavigate();

    // Load cart data from localStorage on component mount
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(savedCart);
    }, []);

    // Update cart in state and localStorage
    const updateCart = (updatedCart) => {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
    };

    const handleQuantityChange = (id, type) => {
        const updatedCart = cartItems.map((item) =>
            item.id === id
                ? {
                      ...item,
                      quantity: type === "increment" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
                  }
                : item
        );
        updateCart(updatedCart);
    };

    const handleRemoveItem = (id) => {
        const updatedCart = cartItems.filter((item) => item.id !== id);
        updateCart(updatedCart);
    };

    const totalPrice = cartItems.reduce(
        (total, item) =>
            total + parseInt(item.price.replace("₹", "").replace(",", "")) * item.quantity,
        0
    );

    return (

        <>
        <Navbar/>

        <div className="bg-gray-100 min-h-screen p-6">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>

                <div className="lg:grid lg:grid-cols-4 gap-6">
                    {/* Cart Items List */}
                    <div className="lg:col-span-3 space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center bg-white p-4 rounded-lg shadow"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-contain rounded-lg mr-4"
                                />
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {item.name}
                                    </h2>
                                    <p className="text-gray-600">{item.price}</p>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleQuantityChange(item.id, "decrement")}
                                        className="w-8 h-8 bg-gray-200 rounded text-gray-600"
                                    >
                                        -
                                    </button>
                                    <span className="mx-4">{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item.id, "increment")}
                                        className="w-8 h-8 bg-gray-200 rounded text-gray-600"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="ml-4 text-red-600 hover:text-red-800"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                        <div className="mb-4">
                            <p className="text-gray-700">Total Items: {cartItems.length}</p>
                            <p className="text-gray-700">
                                Total Price: ₹{totalPrice.toLocaleString()}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full mr-2" onClick={()=>{   navigate("/Checkout")}}>
                                Proceed to Checkout
                            </button>
                            <button className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 w-full" onClick={() => { navigate ("/Home")}}>
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </>
    );
};

export default Cart;
