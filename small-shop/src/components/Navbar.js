import React from 'react'
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import {Nav, Button} from 'react-bootstrap';


const Navbar = () => {
    return (
        <Nav className="navbar navbar-expand-sm  navbar-dark px-sm-5">
            <Link to="/">
                <img src={logo} alt="store" className="navbar-brand" />
            </Link>
            <ul className="navbar-nav align-items-center">
                <li className="nav-item ml-5">
                    <Link to="/" className="nav-link">
                        products
                    </Link>
                </li>
            </ul>
            <Link to="cart" className="ml-auto">
                <Button type="button">
                    <span className="mr-2">
                        <i className="fas fa-cart-plus " />
                    </span>
                    my cart
                </Button>
            </Link>
        </Nav>


    )
}



export default Navbar