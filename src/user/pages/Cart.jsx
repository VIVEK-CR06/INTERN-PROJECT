import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate, NavLink } from "react-router-dom";

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, totalPrice } = useContext(CartContext);
    const navigate = useNavigate();

    return (

        <>
            <Navbar />

            <div className="bg-gray-100 min-h-screen p-6">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
                    {cartItems.length > 0 ? (
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
                                        <p className="text-gray-600">₹{item.price}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity-1)}
                                            className="w-8 h-8 bg-gray-200 rounded text-gray-600"
                                        >
                                            -
                                        </button>
                                        <span className="mx-4">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity+1)}
                                            className="w-8 h-8 bg-gray-200 rounded text-gray-600"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
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
                                    Total Price: ₹{totalPrice}
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full mr-2" onClick={() => { navigate("/checkout") }}>
                                    Proceed to Checkout
                                </button>
                                <button className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 w-full" onClick={() => { navigate("/") }}>
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>) : (
                            <div className="text-center">
                            <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
                            <NavLink
                              to="/"
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                              Start Shopping
                            </NavLink>
                          </div>
                        )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Cart;
