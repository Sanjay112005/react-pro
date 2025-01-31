  import React from 'react';
  import Button from 'react-bootstrap/Button';
  import Col from 'react-bootstrap/Col';
  import Form from 'react-bootstrap/Form';
  import Row from 'react-bootstrap/Row';
  import Toast from 'react-hot-toast'; 
  import { useNavigate } from 'react-router-dom';
  import "./Register.css"
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { Dog } from '../utils/Api';

  function Register() {

  const[firstname,setFirstname] = useState('')
  const[lastname,setLastname] = useState('')
  const[email,setEmail] = useState('')
  const[mobilenumber,SetMobilenumber] = useState('')
  const[password,SetPassword] = useState('')

  const handleSubmit = async(e)=>{
  e.preventDefault()
  // if(!/^[A-Za-z]{1,50}$/.test(firstname)){
  //   toast.error("first name must contian a- z or A- Z")
  //   return
  // }
  // if(!/^[A-Za-z]{1,50}$/.test(Lastname)){
  //   toast.error("first name must contian a- z or A- Z")
  //   return
  // }
  // if(!/^[A-Za-z]{1,50}$/.test(firstname)){
  //   toast.error("first name must contian a- z or A- Z")
  //   return
  // }
  // if(!/^[A-Za-z]{1,50}$/.test(firstname)){
  //   toast.error("first name must contian a- z or A- Z")
  //   return
  // }








  const data = {
    firstname,lastname,email,mobilenumber,password
  }

  try {
    const respond = await Dog.register(data);
    console.log(respond); // Debugging: Check the response structure
    if (respond.ok) {
      Toast.success("Email sent successfully");
    } else {
      Toast.error("Something went wrong");
    }
  } catch (error) {
    console.error(error); 
    Toast.error("An error occurred");
  }
  }

    return (
      
      <div className="register-container">
        <Form className="register-form" onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
            <Form.Label column sm={2}>
            First Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Enter your name" value={firstname} onChange = {(e)=>setFirstname(e.target.value)} />
            </Col>
          </Form.Group>
        
      
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
            <Form.Label column sm={2}>
              Last name
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Enter your name"value={lastname} onChange = {(e)=>setLastname(e.target.value)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="Enter your email" value={email} onChange ={(e)=>setEmail(e.target.value)}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
              MObile no 
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="number" placeholder="Mobile no " value={mobilenumber} onChange = {(e)=>SetMobilenumber(e.target.value)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalConfirmPassword">
            <Form.Label column sm={2}>
              password
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="password" placeholder=" password" value={password} onChange = {(e)=>SetPassword(e.target.value)}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" variant="primary" className="w-100">
                Register
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
  export default Register;
