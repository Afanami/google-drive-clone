import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBarCustom() {
  return (
    <Navbar bg="primary" variant="dark" expand="sm" className="ml-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Google Drive Clone
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="/user">
            Profile
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
