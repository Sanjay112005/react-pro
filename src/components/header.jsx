import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { IoCartOutline } from "react-icons/io5";

function Header() {
  const [searchQuery, setSearchQuery] = useState(""); // State to store search input
  const navigate = useNavigate(); // Navigation hook for redirection

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (searchQuery.trim()) {
      navigate(`/Products?q=${searchQuery}`); // Redirect to Products page with query parameter
    }
  };

  return (
    <Navbar expand="lg" className="bg-primary">
      <Container fluid>
        <Navbar.Brand href="#" className="text-white">Shop Ease</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 text-white"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/Home" className="text-white">Home</Nav.Link>
            <Nav.Link as={Link} to="/About" className="text-white">About</Nav.Link>
            <Nav.Link as={Link} to="/Products" className="text-white">Products</Nav.Link>
            <Nav.Link as={Link} to="/Login" className="text-white">Login</Nav.Link>
            
            
          </Nav>
          <Form className="d-flex align-items-center" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery} // Controlled input
              onChange={(e) => setSearchQuery(e.target.value)} // Update state on change
            />
            <Button variant="outline-light" type="submit" className="me-2">
              Search
            </Button>
            <Button
  variant="light"
  className="d-flex align-items-center justify-content-center"
  as={Link}
  to="/Cart"
>
  <IoCartOutline size={20} />
</Button>

          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
