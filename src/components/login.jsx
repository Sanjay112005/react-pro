import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';




function Login() {
  return (
    <div className="login-container">
      <Form className="login-form">
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" placeholder="Enter your email" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="password" placeholder="Enter your password" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check label="Remember me" />
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
      


      </Form>
      
    </div>
  );
}

export default Login;
