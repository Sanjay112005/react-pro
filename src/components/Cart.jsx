import React, { useEffect, useState } from 'react';
import { Dog } from '../utils/Api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../assets/cart.css'

function Cart({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]); // Ensure cart starts as an empty array
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoad(true);
        const repo = await Dog.getCart();
        console.log("API Response Status:", repo.status);

        if (!repo.ok) {
          if (repo.status === 401 || repo.status === 403) {
            setIsAuthenticated(false);
            localStorage.removeItem('isAuthenticated');
            toast.error("Authentication required, please login");
            navigate('/Login');
          } else {
            toast.error('Failed to fetch cart items');
          }
          return;
        }

        const data = await repo.json();
        console.log("Cart API Response:", data); 

    
        setCart(data?.["Cart Items"] || []);
      } catch (error) {
        console.log('Error fetching cart:', error.message);
        toast.error('Error fetching cart');
      } finally {
        setLoad(false);
      }
    };

    fetchCart();
  }, [setIsAuthenticated, navigate]);

  const handleDelete = async(cartItemId) => {
    try{
      const repos = await Dog.deleteCartItem(cartItemId)
      if(!repos.ok){
        toast.error('failed to remove item')
        return
      }
      setCart((prevItems) => prevItems.filter(item => item.id !== cartItemId))
      toast.success('Item removed from cart');
    }catch(error){
      console.error('Error removing item:', error.message);
       toast.error('Error removing item');
       // cant understand this code 

    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
        toast.error('Your cart is empty. Add items to proceed to checkout.');
        return;
    }
    navigate('/checkout');
};

  return (
    
      <div className="cart-container">
        <h2>Your Cart</h2>
        {load ? (
          <p className="loading-text">Loading your cart...</p>
        ) : cart.length > 0 ? (
          <div>
            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <div>
                    <img src={item.imageUrl} alt={item.model} />
                    <p>{item.model}</p>
                    <p>Quantity: <span>{item.quantity}</span></p>
                    <p>Price: ₹<span>{item.price}</span></p>
                  </div>
                  <button className="remove-btn" onClick={() => handleDelete(item.id)}>Remove</button>
                </li>
              ))}
            </ul>
            <div className="checkout-container">
              <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
          </div>
        ) : (
          <p className="empty-cart">Your cart is empty.</p>
        )}
      </div>
    );
  }  

export default Cart;
