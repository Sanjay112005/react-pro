import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';
import { Dog } from '../utils/Api';
import Toast from 'react-hot-toast';
import ResendVerification from './ResendVerification';

/// why the ...credentials because to keep the previous values of credentials 
/// still resend verification is not complete 


function Login({setIsAuthenticated}) {

  const[credentials,setCredentials] = useState({email:'',password:''})
  const[loginError,setLoginError] = useState(null)
  const[showResendVerfication,setShowResendVerification] = useState(false)
   const navigate =  useNavigate()
  
   
  const handle = async(e) =>{
       e.preventDefault()
      try{
       const repo = await Dog.login(credentials)
       const data = await repo.json()

       if(repo.ok){
        setIsAuthenticated(true)
        Toast.success(data.message || "Logged in successfully")
        navigate("/products")
       }
       else{
        Toast.error(data.error || 'login failed')

        if(data.error && data.error.includes('account not verified ')){
          setLoginError('Account not activated')

        }
       }

      }
      catch(error){
      Toast.error("Error logging in ")
      console.log('login error',error)
      }

  }
  
  return (
    <div className="login-container">
      <Form className="login-form"  onSubmit={handle}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" placeholder="Enter your email"  value={credentials.email} onChange={(e)=>setCredentials({...credentials, email : e.target.value})}/>
          </Col>
        </Form.Group>
      

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="password" placeholder="Enter your password" value={credentials.password} onChange={(e) => setCredentials({...credentials , password:e.target.value})} />
          </Col>
        </Form.Group>


        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" variant="primary" className="w-100">
              Sign in
            </Button>
          </Col>
        </Form.Group>

        <div className="text-center mt-3">
          <p>
            
            Don't have an account?{' '}
            <Link to="/Register" className="register-link">
              Click here to register
            </Link>
          </p>
        </div>

        <div className="text-center mt-3 ">
          <p>
           <Button >
            <Link to="/ForgotPassword" className="register-link" style={{color:"white"}}>
             Forgot password
            </Link></Button>
          </p>
        </div>
        
        
       
            {loginError === 'account not activated ' && (
             <button onClick={() => setShowResendVerification(!showResendVerification)}>

             {showResendVerfication ? 'Hide' : 'Resend Verification'}
             </button>
             )}
             {showResendVerfication && <ResendVerification />}
        
     
      


      </Form>
      
    </div>
  );
}

export default Login;
