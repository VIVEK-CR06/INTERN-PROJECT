import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import pngwing from "../assets/pngwing.png";
import cart2 from "../assets/cart2.png";
import userlogo from "../assets/userlogo.png";
import order from "../assets/order.png";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleCartClick = () => {
    navigate("/cart");
  };


  const handleOrderClick = () => {
    navigate("/order");
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
    
        <div className="flex items-center space-x-3">
          <img className="w-12 sm:w-16" src={pngwing} alt="Logo" />
          <NavLink to={'/home'} className="text-white font-sans text-lg sm:text-xl font-bold">
            Mob-Zone
          </NavLink>
        </div>

        
        <div className="flex flex-wrap w-full lg:w-auto items-center justify-between mt-4 lg:mt-0">
          
          <div className="flex justify-center w-full lg:w-auto mb-4 lg:mb-0 lg:mr-4">
            <input
              type="text"
              placeholder="Search products"
              className="w-full sm:w-96 md:w-[28rem] h-10 p-4 rounded-md outline-none"
            />
          </div>

          
          <div className="flex space-x-4 w-full lg:w-auto justify-center lg:justify-end">
            
            <img
              className="w-9 rounded-md cursor-pointer"
              src={cart2}
              alt="Cart"
              onClick={handleCartClick}
            />

            
            <img className="w-9 rounded-md cursor-pointer" src={order} alt="Orders" onClick={handleOrderClick} />

            
            <NavLink
              className="bg-white text-blue-600 py-2 px-4 rounded-md text-sm hover:bg-gray-200 transition"
              to="/login"
            >
              Login
            </NavLink>

            <div className="relative">
              <img
                className="w-9 hover:shadow-md rounded-full cursor-pointer"
                src={userlogo}
                alt="User"
                onClick={() => setIsProfileOpen(!isProfileOpen)} 
              />
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                  <ul className="text-gray-700">
                    <li>
                      <NavLink
                        to="/login"
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/signup"
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        Sign Up
                      </NavLink>
                    </li>
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-200"
                        onClick={() => alert("Logged out successfully!")}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
