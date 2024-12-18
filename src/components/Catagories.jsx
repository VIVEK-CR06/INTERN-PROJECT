import React from "react";
import { NavLink } from "react-router-dom";

const categories = [
  { name: "Samsung", link: "/samsung" },
  { name: "Apple", link: "/apple" },
  { name: "Xiaomi", link: "/xiaomi" },
  { name: "Motrola", link: "/motrola" },
  { name: "Redmi", link: "/redmi" },
  { name: "Nothing", link: "/nothing" },
  { name: "Pixel", link: "/pixel" },
  { name: "Nokia", link: "/nokia" },

];

const NavbarCategories = () => {
  return (
    <nav className="bg-white text- hover:text-shadow">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between py-4">
          <ul className="flex flex-wrap gap-4">
            {categories.map((category, index) => (
              <li key={index} className="group relative">
                <NavLink
                  to={category.link}
                  className="px-4 py-2 text-sm font-medium hover:text-gray-200"
                >
                  {category.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarCategories;
