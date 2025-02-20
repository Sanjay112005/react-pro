import React, { useState, useCallback } from 'react';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { Toaster, toast } from 'react-hot-toast';

import Header from './components/Header';

import ForgotPassword from './components/ForgotPassword';
import Approutes from './components/approutes';
import ResetPassword from './components/ResetPassword';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback((product) => {
    if (product && product.title) {
      setCartItems((prevItems) => {
        const newItems = [...prevItems, product];
        toast.success(`${product.title} has been added to the cart!`);
        return newItems;
      });
    } else {
      console.error('Product title is undefined or invalid:', product);
    }
  }, []);

  return (
    <BrowserRouter>
      <Toaster
        // position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: '#4caf50',
              color: '#fff',
            },
          },
          error: {
            style: {
              background: '#f44336',
              color: '#fff',
            },
          },
        }}
      />
      <div className="app">
        <Header cartItems={cartItems} />
        <Approutes cartItems={cartItems} addToCart={addToCart} />
        
        
      </div>
    </BrowserRouter>
  );
}

export default App;
