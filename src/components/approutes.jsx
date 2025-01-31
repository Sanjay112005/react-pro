import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Products from './Products';
import Login from './login';
import Register from './register';
import Cart from './Cart';  // Import Cart component
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

const Approutes = () => {
  // State to hold cart items
  const [cartItems, setCartItems] = useState([]);

  // Function to add item to the cart
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // Function to remove item from the cart
  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));  // Filter out the item with the given id
  };

  return (
    <Routes>
      <Route path="/Home" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route
        path="/products"
        element={<Products addToCart={addToCart} />} // Pass addToCart to Products
      />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path='Resetpassword' element={<ResetPassword />} />
      <Route path='forgotpassword' element={<ForgotPassword />} />
   
      <Route
        path="/cart"
        element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} // Pass removeFromCart to Cart
      />
    </Routes>
  );
};

export default Approutes;
