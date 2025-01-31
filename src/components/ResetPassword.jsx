import React, { useState } from 'react'
import Toast from 'react-hot-toast'
import { Dog } from '../utils/Api'
import { useNavigate, useSearchParams } from 'react-router-dom'


// working of resetpassword now here the system generates the token in the url
// for security reasons and to identify the user so each user will get separate token 
// now using the usesearchparams we will read the token from the url 
// once we read the token we get the token from the url it will look like "https://example.com/reset-password?token=xyz123"
// at the end their is the token after getting the token now we send that to the backend using api to verify the request so we send the token and the newpassword to the backend if the backend 
// verifies the request and identifies the user correctly it will update the password this is how it works 

function ResetPassword() {
  const[newpassword,setNewpassword]= useState('')
  const[confirmPassword,setConfirmPassword] = useState('');
  const [searchParams] = useSearchParams()
  const navi = useNavigate();
  const token = searchParams.get("token")




  const handlesubmit = async(e) =>{
    e.preventDefault()
    if(newpassword !== confirmPassword){
        Toast.error("the password typed thus not match ")
        return
    }
    try{
   const resets =  Dog.resetPassword(token, {newpassword} )
    if(resets.ok){
      Toast.success('password reset successfully ')
      navi('/Login')
    }
    else{
        Toast.error("failed to reset ")
    }
    }
    catch(error){
     Toast.error("failed")
    }

}
  
  return (
    <div>
        <form onSubmit={handlesubmit}>
            <h2>Reset Password</h2>
            <input type="password" value={newpassword} onChange={(e)=>setNewpassword(e.target.value)} required />
           <input type="password"  value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
           <button type='submit'>Reset Password</button>
        </form>
      
    </div>
  )
}

export default ResetPassword
