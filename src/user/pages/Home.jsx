import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Catagories from "../../components/Catagories";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    axios
      .get("http://localhost:5003/products")
      .then((response) => {
        setProducts(response.data); 
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <>
      <div className="fixed top-0 w-full z-50">
        <Navbar />
        <Catagories />
      </div>
      <div className="mt-32 bg-gray-100 min-h-screen p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Products</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-20 lg:pt-0">
            {products.map((product) => (

                

              <Link
                to={`/products/${product.id}`}
                key={product.id} 
                className="bg-white p-2 rounded-lg shadow hover:shadow-lg transition duration-300"
              >
                <img
                  src={product.image} 
                  alt={product.name}
                  className="object-contain mb-4 rounded"
                />
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  {product.name} 
                </h2>
                <p className="text-gray-600 mb-4">{product.brand}</p>
                <p className="text-gray-600 mb-4">{product.price}</p>
                {/* <p className="text-gray-400 mb-4">{product.description}</p> */}
                {/* <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                  Add to Cart
                </button> */}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
