import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Dog } from '../utils/Api'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function Verifyaccount() {
   const[status,setStatus]= useState(null)
   const[searchParams] = useSearchParams()
   

   useEffect(()=>{
       
   const tokens =  searchParams.get("token");
   if(tokens) {
    Dog.verifyAccount(tokens)
    .then((response) =>{
        toast.success(response.detail || "verification completed successfully ")
          setStatus("Success")
})
.catch((error)=>{
  toast.error(error.message || 'verification failed')
  setStatus('error')
})
   }



   },[searchParams]);
 
 
    return (
    <div>
      {status === null && <p>Verifying your account...</p>}
{status === "Success" && <p>Your account has been verified successfully</p>}
{status === "error" && <p>Your account has not been verified</p>}

    </div>
  )
}

export default Verifyaccount
