import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductDetailes from './ProductDetailes';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Order from './pages/Order';

const UserRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="footer" element={<Footer />} />
        <Route path="products/:id" element={<ProductDetailes />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order" element={<Order />} />
      </Routes>
      <Footer />
    </>
  );
};

export default UserRouter;
