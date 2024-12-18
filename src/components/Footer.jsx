import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-blue-600 text-white py-8'>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
                <h2 className='text-xl font-bold mb-4'>Mob-Zone</h2>
                <p className='text-sm'>Your one-stop solution for mobile accessories. Quality products and exceptional service at your fingertips.</p>
            </div>
            <div>
                <h3 className='text-lg font-bold mb-4'>Quick Links</h3>
                <ul className='space-y-2'>
                    <li>
                        <a href='#' className="hover:text-gray-300">Home</a>
                    </li>
                    <li>
                    <a href='#' className="hover:text-gray-300">Products</a>
                    </li>
                    <li>
                    <a href='#' className="hover:text-gray-300">Cart</a>
                    </li>
                    <li>
                    <a href='#' className="hover:text-gray-300">Contact Us</a>
                    </li>
                </ul>
            </div>
            <div>
                <h3 className='text-lg font-bold mb-4'>Support</h3>
                <ul className='space-y-2'>
                    <li>
                    <a href='#' className="hover:text-gray-300">FAQs</a>
                    </li>
                    <li>
                    <a href='#' className="hover:text-gray-300">Shipping & Returns</a>
                    </li>
                    <li>
                    <a href='#' className="hover:text-gray-300">Privacy Policy</a>
                    </li>
                    <li>
                    <a href='#' className="hover:text-gray-300">Terms & Conditions</a>
                    </li>
                </ul>
            </div>
            <div>
                <h3 className='text-lg font-bold mb-4'>Follow Us</h3>
                    <li>
                    <a href='#' className="hover:text-gray-300">Instagram</a>
                    </li>
                    <li>
                    <a href='#' className="hover:text-gray-300">Facebook</a>
                    </li>
                    <li>
                    <a href='#' className="hover:text-gray-300">Twitter</a>
                    </li>
                    <li>
                    <a href='#' className="hover:text-gray-300">Linkdin</a>
                    </li>
            </div>
        </div>
    </footer>
  )
}

export default Footer