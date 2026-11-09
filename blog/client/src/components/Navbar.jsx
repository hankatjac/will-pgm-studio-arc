import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavbarMenu = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [keyword, setKeyword] = useState("");
  // const inputRef= useRef()

  const handleChange = (e) => setKeyword(e.target.value.trim().toLowerCase());

  console.log(keyword);

  return (
    <Navbar collapseOnSelect expand="lg" bg="secondary" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/">
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Blog
            </Nav.Link>
            <Nav.Link as={Link} to="/write">
              Post
            </Nav.Link>
            <NavDropdown title="Categories" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/?cat=business">
                Business
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/?cat=culture">
                Culture
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/?cat=technology">
                Technology
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/?cat=quotidian">
                Quotidian
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link>{currentUser?.username}</Nav.Link>
            {currentUser ? (
              <Nav.Link eventKey={1} as={Link} to="/" onClick={logout}>
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link eventKey={1} as={Link} to="/login">
                Login
              </Nav.Link>
            )}

            <Nav.Link eventKey={2} as={Link} to="/register">
              Register
            </Nav.Link>
          </Nav>
          <div className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={handleChange}
            />
            {keyword && <Link
              className="btn btn-info"
              to="/search"
              variant="outline-success"
              state={{ from: keyword }}
            >
              Search
            </Link>}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarMenu;
