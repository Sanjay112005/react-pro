import React, { useState } from 'react'
import { Dog } from '../utils/Api'
import '../assets/styles.css'
import toast from 'react-hot-toast'

const Addtocart = ({product_id}) => {
 const[quantity,setQuantity]= useState(1)
 const handle = async()=>{
   try{
    const repo = await Dog.addToCart(product_id, quantity)
     
    if(repo.ok){
    const data = await repo.json()
    toast.success(data.Message);
    }
    else{
        const errorData = await repo.json()
        toast.error(errorData.Message)
    }

}
   catch(error){
    console.log("error to add the item to cart ")
    toast.error("failed t add the item")

   }

 }
 
 
 
    return (
    <div className="add-to-cart-container">
        <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="quantity-input"
       />
       <button onClick={handle} className="add-to-cart-button">Add to cart</button>
    </div>
  )
}

export default Addtocart;
