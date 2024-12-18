import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProductDetailes = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:5001/products/${id}`)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product details:", error);
                setLoading(false);
            });
    }, [id]);

    // Handle Add to Cart
    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
        // Check if the product is already in the cart
        const productExists = cart.find((item) => item.id === product.id);
    
        if (productExists) {
            productExists.quantity += 1; // Increment quantity if it exists
        } else {
            cart.push({ ...product, quantity: 1 }); // Add new product with quantity 1
        }
    
        localStorage.setItem("cart", JSON.stringify(cart)); // Save to localStorage
        navigate("/cart"); // Redirect to Cart page
    };
    
    // Handle Buy Now
    const handleBuyNow = () => {
        // Add the product directly to cart and redirect to checkout page
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({ ...product, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(cart));
        navigate("/checkout");
    };

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found.</div>;

    return (
        <>
            <Navbar />
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-80 object-contain rounded-lg"
                            />
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                            <p className="text-gray-500 text-lg">{product.brand}</p>
                            <p className="text-xl font-semibold text-gray-700 mt-4">
                                Price: {product.price}
                            </p>
                            <p className="mt-4 text-gray-700">{product.description}</p>

                            <h3 className="mt-6 font-semibold text-gray-700">Specifications:</h3>
                            <ul className="list-disc ml-6 text-gray-600">
                                {product.specification &&
                                    Object.entries(product.specification).map(([key, value]) => (
                                        <li key={key}>
                                            <strong>{key}:</strong> {value}
                                        </li>
                                    ))}
                            </ul>

                            <div className="mt-6">
                                <button
                                    onClick={handleAddToCart}  // Add to Cart functionality
                                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={handleBuyNow}  // Buy Now functionality
                                    className="bg-green-600 text-white py-2 px-4 ml-4 rounded hover:bg-green-700"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetailes;
