import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import pngwing from "../assets/pngwing.png";
import cart2 from "../assets/cart2.png";
import order from "../assets/order.png";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("user")
  const username = localStorage.getItem("username")
  const {logout} = useContext(AuthContext);
  const {cartItems} = useContext(CartContext);

  const handleCartClick = () => {
    if (!user) {
      alert("Please login and enjoy your shopping!");
      navigate("/login");
    } else {
      navigate("/cart");
    }
  };

  const handleOrderClick = () => {
    if (!user) {
      alert("Please login and enjoy your shopping!");
      navigate("/login");
    } else {
      navigate("/order");
    }
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/login"); // Redirect to the login page after logout
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img className="w-12 sm:w-16" src={pngwing} alt="Logo" />
          <NavLink
            to={"/"}
            className="text-white font-sans text-lg sm:text-xl font-bold"
          >
            Mob-Zone
          </NavLink>
        </div>

        {/* Search Bar */}
        <div className="flex flex-wrap w-full lg:w-auto items-center justify-between mt-4 lg:mt-0">
          <div className="flex justify-center w-full lg:w-auto mb-4 lg:mb-0 lg:mr-4">
            <input
              type="text"
              placeholder="Search products"
              className="w-full sm:w-96 md:w-[28rem] h-10 p-4 rounded-md outline-none"
            />
          </div>

          {/* Right Section */}
          <div className='flex items-center justify-center gap-3'>
                        <NavLink to="/cart" className='flex items-center justify-center cursor-pointer hover:-translate-y-0.1' >
                            <img src={cart2} className='w-9 relative rounded-md' />
                            <span className='absolute mb-8 mr-4 bg-orange-500 rounded-full w-5 h-5 flex justify-center items-center'>
                                {cartItems && cartItems.length || 0}
                            </span>
                        </NavLink>

            {/* Orders */}
            <img
              className="w-9 rounded-md cursor-pointer"
              src={order}
              alt="Orders"
              onClick={handleOrderClick}
            />

            {/* Conditional Rendering: Show Login or Profile */}
            {user ? (
              <div className="relative">
                {/* Show Username */}
                <span
                  className="text-white font-semibold cursor-pointer"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  {username}
                </span>
                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                    <ul className="text-gray-700">
                      <li>
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-200"
                          onClick={logout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              // Show Login Button
              <NavLink
                className="bg-white text-blue-600 py-2 px-4 rounded-md text-sm hover:bg-gray-200 transition"
                to="/login"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
