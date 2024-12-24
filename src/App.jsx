import React from 'react'
import { Routes,Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

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