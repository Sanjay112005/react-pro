import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa"; // Import User Icon
import { Dog } from "../utils/Api";
import Toast from "react-hot-toast";

function Header() {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );

  const navigate = useNavigate();

  const handlelogout = async () => {
    try {
      const repo = await Dog.logout();
      if (repo.ok) {
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
        Toast.success("Logged out successfully");
        window.location.href = "/Login";
      } else {
        Toast.error("Failed to logout");
      }
    } catch (error) {
      Toast.error("Error logging out");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/Products?q=${searchQuery}`);
    }
  };

  return (
    <Navbar expand="lg" className="bg-primary">
    <Container fluid>
      <Navbar.Brand href="#" className="text-white">Shop Ease</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        {/* Left-aligned navigation items */}
        <Nav className="me-auto text-white">
          {isAuthenticated ? (
            <>
              <Nav.Link as={Link} to="/Home" className="text-white">Home</Nav.Link>
              <Nav.Link as={Link} to="/Products" className="text-white">Products</Nav.Link>
              <Nav.Link as={Link} to="/OrderHistory" className="text-white">Order History</Nav.Link>
              <Nav.Link className="text-white" onClick={handlelogout}>Logout</Nav.Link>
            </>
          ) : (
            <Nav.Link as={Link} to="/Login" className="text-white">Login</Nav.Link>
          )}
        </Nav>
  
        {/* Right-aligned search, cart, and profile */}
        <Form className="d-flex align-items-center ms-auto" onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="outline-light" type="submit" className="me-2">Search</Button>
  
          <Button variant="light" as={Link} to="/Cart" className="me-2">
            <IoCartOutline size={20} />
          </Button>
  
          <Nav.Link as={Link} to="/Profile" className="text-white d-flex align-items-center">
            <FaUserCircle size={28} className="me-1" />
          </Nav.Link>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  
  );
}

export default Header;
