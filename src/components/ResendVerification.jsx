import React, { useState } from 'react'
import { Dog } from '../utils/Api'
import toast from 'react-hot-toast'

function ResendVerification({onClose}) {
const[email,setEmail] = useState('')

const handleResendVerification = (e) =>{
   e.preventDefault()

   Dog.resendVerification({email})
   .then((response) =>{
    toast.success(response.Message || 'verfication sent  ')
     if(onClose) onclose()

}) 
.catch((error)=>{
  toast.error(error.Message || 'failed to sent verfication ')
})
}



    return (
        <div>
        <form onSubmit={handleResendVerification}>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Resend Verification</button>
        </form>
    </div>
  )
}

export default ResendVerification
