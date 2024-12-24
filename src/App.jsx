import React from 'react'
import { Routes,Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import AdminNavbar from './components/AdminNavbar';
import AdminHome from './admin/AdminHome';
import ManageProducts from './admin/pages/ManageProducts';
import ManageUsers from './admin/pages/ManageUsers';
import Dashboard from './admin/pages/Dashboard';
import ManageOrders from './admin/pages/ManageOrders';

import Login from './Authentication/pages/Login';
import SignUp from './Authentication/pages/SignUp';
import Home from './user/pages/Home';
import ProductDetailes from './user/ProductDetailes';

import Cart from './user/pages/Cart';
import UserProtectedRoutes from './user/pages/UserProtectedRoutes';
import Checkout from './user/pages/Checkout';
import Order from './user/pages/Order';
import { CartProvider } from './contexts/CartContext';

const App = () => {
  return(
    <AuthProvider>
      <CartProvider>
        <Routes>

          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/' element={<Home/>} />
          <Route path='/products/:id' element={<ProductDetailes/>} />

          <Route path='/adminhome' element={<AdminHome/>} />
          <Route path='/adminnavbar' element={<AdminNavbar/>} />
          <Route path='/dashbord' element={<Dashboard/>} />
          <Route path='/manageproducts' element={<ManageProducts/>} />
          <Route path='/manageusers' element={<ManageUsers/>} />
          <Route path='/manageorders' element={<ManageOrders/>} />

          <Route
            path='/cart'
            element={
              <UserProtectedRoutes>
                <Cart/>
              </UserProtectedRoutes>
            } />

            <Route
              path='/order'
              element={
                <UserProtectedRoutes>
                  <Order/>
                </UserProtectedRoutes>
              } />

              <Route
                path='/checkout'
                element={
                  <UserProtectedRoutes>
                    <Checkout/>
                  </UserProtectedRoutes>
                } />
        </Routes>
      </CartProvider>
    </AuthProvider>
  )
}

export default App