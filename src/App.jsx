import React from 'react'
import Login from './Authentication/pages/Login';
import SignUp from './Authentication/pages/SignUp';
import Home from './user/pages/Home'
import Footer from './components/Footer';
import ProductDetailes from './user/ProductDetailes';
import Cart from './user/pages/Cart';
import Checkout from './user/pages/Checkout';
import Order from './user/pages/Order';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element= {<Navigate to={'/login'} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/navbar' element={<Navbar/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/footer' element={<Footer/>} />
        <Route path="/products/:id" element={<ProductDetailes />} /> 
        <Route path='/cart' element={<Cart/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/order' element={<Order/>} />
      </Routes>
    </Router>
  )
}

export default App;