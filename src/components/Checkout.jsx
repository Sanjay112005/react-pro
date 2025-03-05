import React, { useState } from 'react';
import { Dog } from '../utils/Api';
import toast from 'react-hot-toast';
import './check.css'



function Checkout() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleCheckout = async () => {
    try {
      const repo = await Dog.checkout();
      console.log("Checkout response:", repo); // Debugging

      if (repo?.Success) { // Ensure correct key from API response
        setOrderDetails(repo);
        toast.success(repo.Message || "Checkout successful!");
      } else {
        toast.error(repo?.Message || "Checkout not successful");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Failed to proceed. Please try again.");
    }
  };

  const handlePayment = async () => {
    if (!orderDetails) {
      toast.error('There is no order to checkout');
      return;
    }

    const orderId = orderDetails["Order ID"] || orderDetails.order_id; // Ensure correct key
    if (!orderId) {
      toast.error('Order is missing, please complete checkout process');
      return;
    }

    console.log("Order ID:", orderId);
    
    if (!isAuthenticated) {
      toast.error('You must be logged in to make a payment');
      return;
    }

    try {
      const res = await Dog.makePayment(orderId);
      console.log("Payment response:", res); // Debugging

      if (res?.Success || res?.success) { // Ensure correct API key
        toast.success(res?.Message || "Payment successful!"); // Ensure message is valid
        setOrderDetails(null);
      } else {
        toast.error(res?.Message || 'Payment failed');
      }
    } catch (error) {
      console.error('Error during payment:', error.message);
      toast.error('Failed to process payment. Please try again.');
    }
  };

  return (
<div className="checkout-container">

      <h2>Checkout</h2>
      <button onClick={handleCheckout}>Proceed to checkout</button>
      {orderDetails && (
        <div className="order-summary">

          <h3>Order Summary</h3>
          <p>Order ID: {orderDetails["Order ID"] || orderDetails.order_id}</p>
          <p>Total Amount: ₹{orderDetails["Total Amount"] || orderDetails.total_amount}</p>
          <button className="payment-button" onClick={handlePayment}>Make Payment</button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
