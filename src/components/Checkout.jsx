import React, { useState } from 'react'
import { Dog } from '../utils/Api'
import toast from 'react-hot-toast'

function Checkout() {
  const[orderDetails,setOrderDetails] = useState(null)
  const[isAuthenticated,SetIsAuthenticated] =useState(true)
  
  const handleCheckout = async()=>{
    try{
    const repo =  await Dog.checkout()
    console.log("Checkout response:", repo); 
    if (repo?.Success) {
        setOrderDetails(repo);
        toast.success(repo.Message);
      } else {
        toast.error(repo?.Message || "Checkout not successful");
      }
    } catch (error) {
      console.error("Error during checkout:", error); // Log full error
      toast.error("Failed to proceed. Please try again.");
    }
  }

  const handlePayment = async()=>{
    if(!orderDetails){
   toast.error('their is no order to checkout ')
    return;
}

   const order = orderDetails["Order ID"]
   if(!order){
    toast.error('order is missing please complete checkout process')
    return;
   }
console.log("order" , order)
if(!isAuthenticated){
    toast.error('you must be loggged in to make a payment  ')
     return;
}
try{
    const res = await Dog.makePayment(order)
  if(res.success){
    toast.success(res.Message)
    setOrderDetails(null)
  }
  else{
    toast.error(res.Message || 'payment failed')
  }

}
catch(error){
    console.error('Error during payment:', error.message);
    toast.error('Failed to process payment. Please try again.');
}


  }
  
  
  
    return (
    <div>
      <h2>Checkout</h2>
      <button onClick={handleCheckout}>Proceed to checkout</button>
   {orderDetails && (
    <div>
        <h3>order summary</h3>
        <p>Order ID : {orderDetails["Order ID"]}</p>
     <p>Total Amount : ₹{orderDetails["Total Amount"]}</p>
    <button onClick={handlePayment}>Make Payment</button>
    </div>
   )}
   
    </div>
  )
}

export default Checkout
