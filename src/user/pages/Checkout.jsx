import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [billingDetails, setBillingDetails] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        zip: "",
    });

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(savedCart);
    }, []);

    const totalPrice = cartItems.reduce(
        (total, item) =>
            total + parseInt(item.price.replace("₹", "").replace(",", "")) * item.quantity,
        0
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails({ ...billingDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Order Placed!", { billingDetails, cartItems });
        alert("Order placed successfully!");
        localStorage.removeItem("cart");
        setCartItems([]);
    };

    return (

        <>
            <Navbar/>

        <div className="bg-gray-100 min-h-screen p-6">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Order Summary */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center bg-gray-50 p-4 rounded"
                                >
                                    <div>
                                        <p className="font-semibold text-gray-800">{item.name}</p>
                                        <p className="text-sm text-gray-600">
                                            Quantity: {item.quantity}
                                        </p>
                                    </div>
                                    <p className="text-gray-800 font-semibold">
                                        ₹{(item.price.replace("₹", "").replace(",", "") * item.quantity).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 border-t pt-4">
                            <div className="flex justify-between font-semibold text-gray-800">
                                <p>Total Price:</p>
                                <p>₹{totalPrice.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Billing Details */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-6 rounded-lg shadow space-y-4"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Billing Details</h2>
                        <div>
                            <label className="block text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={billingDetails.name}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={billingDetails.email}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Address</label>
                            <textarea
                                name="address"
                                value={billingDetails.address}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Enter your address"
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">City</label>
                            <input
                                type="text"
                                name="city"
                                value={billingDetails.city}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Enter your city"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">ZIP Code</label>
                            <input
                                type="text"
                                name="zip"
                                value={billingDetails.zip}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Enter your ZIP code"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                        >
                            Place Order
                        </button>
                    </form>
                </div>
            </div>
        </div>
            <Footer/>
        </>
    );
};

export default Checkout;
