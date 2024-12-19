import React from 'react'
import Login from './Authentication/pages/Login';
import SignUp from './Authentication/pages/SignUp';
import Home from './user/pages/Home'
import Footer from './components/Footer';
import ProductDetailes from './user/ProductDetailes';
import Cart from './user/pages/Cart';
import Checkout from './user/pages/Checkout';
import Order from './user/pages/Order';
import Dashboard from './admin/pages/Dashboard';
import AdminNavbar from './components/AdminNavbar';
import AdminHome from './admin/AdminHome';
import ManageProducts from './admin/pages/ManageProducts';
import ManageUsers from './admin/pages/ManageUsers';
import Reports from './admin/pages/Reports';
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
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/adminnavbar' element={<AdminNavbar/>} />
        <Route path='/adminhome' element={<AdminHome/>} />
        <Route path='/manageproduct' element={<ManageProducts/>} />
        <Route path='/manageusers' element={<ManageUsers/>} />
        <Route path='/reports' element={<Reports/>} />
      </Routes>
    </Router>
  )
}

export default App;