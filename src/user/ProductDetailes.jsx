import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchProductById } from "../api/productApi";
import { CartContext } from "../contexts/CartContext"; // Use the custom hook for CartContext

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State for error handling
    const { addToCart } = useContext(CartContext);
    const user = localStorage.getItem("user");
    const navigate = useNavigate();
    


    useEffect(() => {
        const fetchProductDetails = async () => {
            try{
                const response = await fetchProductById(id);
                setProduct(response.data);
            }
            catch(err){
                setError('Failed to fetch product details')
            }
            finally{
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    

    
    if (loading) return <div className="text-center text-gray-700">Loading...</div>;
    if (error) return <div className="text-center text-red-600">{error}</div>;
    if (!product) return <div className="text-center text-gray-700">Product not found.</div>;

    return (
        <>
            <Navbar />
            <div className="p-6 bg-gray-100 min-h-screen relative">
                {/* Popup Notification */}
                

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
                                Price:₹{product.price}
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
                                    onClick={() => user? addToCart(product) : navigate("/login")}
                                    className="bg-blue-600 text-white py-2 px-28 rounded hover:bg-blue-700"
                                >
                                    Add to Cart
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

export default ProductDetails;
