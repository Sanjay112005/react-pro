import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Products from './Products';
import Login from './login';
import Register from './register';
import Cart from './Cart';  // Import Cart component
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Verifyaccount from './Verifyaccount';
import Checkout from './Checkout';
import UserProfile from './UserProfile';
import OrderHistory from './OrderHistory';
import ResendVerification from './ResendVerification';
import ReactivateVerification from './ReactivateVerification';
import ReactivateAccount from './ReactivateAccount';

const Approutes = () => {
  // State to hold cart items

  // the reason for using the localstorage .setitem is when the use logs in or something once if the the page refreshes the detail are lsot the isauthenticated state becomes false 
  // so no content will be displyed inorder to prevent the webpage even the page refreshes the content will be their so thssi can be acheived by using local storage 
const[isAuthenticated,setIsAuthenticated] = useState(
  JSON.parse(localStorage.getItem('isAuthenticated')) || false
)
useEffect(()=>{
  localStorage.setItem('isAuthenticated',JSON.stringify(isAuthenticated))
},[isAuthenticated])

  const [cartItems, setCartItems] = useState([]);



  return (
    <Routes>
      <Route path="/Home" element={<Home setIsAuthenticated={setIsAuthenticated}/>} />
      <Route path="/About" element={<About setIsAuthenticated={setIsAuthenticated} />} />
      <Route
        path="/Products"
        element={<Products  setIsAuthenticated={setIsAuthenticated} />}
      />
      <Route path="/Login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
      <Route path="/Register" element={<Register />} />
      <Route path='reset-password' element={<ResetPassword/>} />
      <Route path='forgotpassword' element={<ForgotPassword />} />
      <Route path='verify-account' element={<Verifyaccount/>}/>
   
      <Route
        path="/cart"
        element={<Cart />} 
      />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/Profile' element={<UserProfile setIsAuthenticated={setIsAuthenticated} />}/>
      <Route path='/OrderHistory' element = {<OrderHistory setIsAuthenticated={setIsAuthenticated} />}  />
      <Route path="/resend-verification" element={<ResendVerification />} />
      <Route path="/reactivate-verification" element={<ReactivateVerification />} />
      <Route path="/activate-account" element={<ReactivateAccount />} />
    </Routes>
  );
};

export default Approutes;
