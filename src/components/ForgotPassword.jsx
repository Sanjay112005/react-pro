import React, { useState } from 'react'

import { Dog } from '../utils/Api'
import './forget.css'
import Toast from 'react-hot-toast'

function ForgotPassword() {
  const[email,setEmail] = useState('')
  
     const handlesubmit = async(e) => {
        e.preventDefault()
        if(!email){
            Toast.error("Email is required")
            return
        }

        try{
            const repo = await Dog.forgotpassword(email)  
            const something = await repo.json();
            if(repo.ok){
                Toast.success("passwarod reset sent successfully ")
            }
            else{
                Toast.error(something.detail ||"failed to send")
            }
            }
            catch(error){
                console.log("error during forgot pass",error)
                Toast.error('an error occured to send the reset link')
            }

     }

  
    return (
        <>
    <div className='forgot-password'>
      <form onSubmit={handlesubmit}>
        <h2>Forgot Password</h2>
        <input type="email"
        placeholder='Enter your email'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        required />
         <button type='submit'>Send Reset link</button>
      </form>
    </div>
    </>
  )
}

export default ForgotPassword
