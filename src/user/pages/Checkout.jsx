import React, { useState, useEffect, useContext } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import payment2 from "../../assets/payment2.jpeg";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { addNewOrder } from "../../api/OrderApi";

const Checkout = () => {
    const [successMessage , setSuccessMessage ] = useState('');
    const navigate = useNavigate();
    const { cartItems, clearCart} = useContext(CartContext);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        zip: "",
    });
    const [paymentMethod, setPaymentMethod] = useState(" ");
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

    const totalPrice = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handlePaymentDetailsChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails({ ...paymentDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('Order placed Successfully')
        const newOrder = {
            id: Date.now().toString(),
            username: localStorage.getItem("username"),
            date: Date(),
            paymentMethod: paymentMethod,
            paymentDetails: paymentDetails,
            total: totalPrice,
            address: formData,
            orderStatus: "Not Deliverd",
            paymentStatus: "paid",
            products: cartItems
        }
        await addNewOrder(newOrder);
        clearCart();
        setTimeout(() => {
            setSuccessMessage('');
            navigate('/order')
        }, 2000);

    };

    return (
        <>
            <Navbar />

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
                                            ₹{(item.price * item.quantity)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 border-t pt-4">
                                <div className="flex justify-between font-semibold text-gray-800">
                                    <p>Total Price:</p>
                                    <p>₹{totalPrice}</p>
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
                                    value={formData.name}
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
                                    value={formData.email}
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
                                    value={formData.address}
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
                                    value={formData.city}
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
                                    value={formData.zip}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Enter your ZIP code"
                                />
                            </div>

                            {/* Payment Methods */}
                            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Payment Method</h2>
                            <div className="space-y-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="gpay"
                                        checked={paymentMethod === "gpay"}
                                        onChange={handlePaymentChange}
                                        className="mr-2"
                                    />
                                    Google Pay (GPay)
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="debit"
                                        checked={paymentMethod === "debit"}
                                        onChange={handlePaymentChange}
                                        className="mr-2"
                                    />
                                    Debit Card
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={paymentMethod === "cod"}
                                        onChange={handlePaymentChange}
                                        className="mr-2"
                                    />
                                    Cash on Delivery (COD)
                                </label>
                            </div>

                            {/* Conditional Payment Options */}
                            {paymentMethod === "gpay" && (
                                <div className="mt-4">
                                    <p className="text-gray-700">Scan the QR code below:</p>
                                    <img
                                        src={payment2}
                                        alt="QR Code"
                                        className="w-32 h-32 mt-2"
                                    />
                                </div>
                            )}

                            {paymentMethod === "debit" && (
                                <div className="mt-4 space-y-2">
                                    <div>
                                        <label className="block text-gray-700 mb-2">Card Number</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={cardDetails.cardNumber}
                                            onChange={handleCardDetailsChange}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded"
                                            placeholder="Enter card number"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">Expiry Date</label>
                                        <input
                                            type="text"
                                            name="expiry"
                                            value={cardDetails.expiry}
                                            onChange={handleCardDetailsChange}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded"
                                            placeholder="MM/YY"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">CVV</label>
                                        <input
                                            type="password"
                                            name="cvv"
                                            value={cardDetails.cvv}
                                            onChange={handleCardDetailsChange}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded"
                                            placeholder="Enter CVV"
                                        />
                                    </div>
                                </div>
                            )}

                            {paymentMethod === "cod" && (
                                <div className="mt-4">
                                    <p className="text-red-600 font-bold">Don't fool with me, Nikesh!</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-6"
                            >
                                Place Order
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Checkout;
