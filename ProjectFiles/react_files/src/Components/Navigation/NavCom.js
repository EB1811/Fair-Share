import React from "react";

// React Components
//import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import NavBar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";

// React Router
import { NavLink, Link } from "react-router-dom";
import Navbar from "react-bootstrap/NavBar";

//TODO: Add conditional formatting once server is made.

const NavCom = () => {
    return (
        <NavBar expand='md' style={{ backgroundColor: "#fff" }} variant='light'>
            <Container fluid>
                <Navbar.Brand>
                    <Link style={{ textDecoration: "none" }} to='/'>
                        <span className='brandName'>Fair / Share</span>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav' className='ml-3'>
                    <Nav className='mr-auto'>
                        <NavLink className='nav-link' exact to='/'>
                            Home
                        </NavLink>
                        <NavLink className='nav-link' exact to='/Learn'>
                            Learn
                        </NavLink>
                        <span style={{ padding: "0.5rem", color: "#777777" }}>
                            |
                        </span>

                        <span
                            className=''
                            style={{
                                display: "block",
                                padding: "0.5rem",
                                fontWeight: "500",
                            }}
                        >
                            Share:
                        </span>
                        <NavLink
                            className='nav-link'
                            exact
                            to='/Distribute/Information/Rent'
                        >
                            Rent
                        </NavLink>
                        <NavLink
                            className='nav-link'
                            exact
                            to='/Distribute/Information/Goods'
                        >
                            Goods
                        </NavLink>
                        <NavLink
                            className='nav-link'
                            exact
                            to='/Distribute/Information/Goods'
                        >
                            Finances
                        </NavLink>
                        <span style={{ padding: "0.5rem", color: "#777777" }}>
                            |
                        </span>
                    </Nav>
                    <SignedOutLinks />
                </Navbar.Collapse>
            </Container>
        </NavBar>
    );
};

/*
<NavBar variant='dark' className='navbarStyle'>
            <Nav className='justify-content-md-center' style={{ flex: 1 }}>
                <Nav.Item>
                    <Link
                        className='nav-link'
                        style={{ textDecoration: "none" }}
                        to='/'
                    >
                        Home
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link
                        className='nav-link'
                        style={{ textDecoration: "none" }}
                        to='/Learn'
                    >
                        Learn
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link
                        className='nav-link'
                        style={{ textDecoration: "none" }}
                        to='/About'
                    >
                        About
                    </Link>
                </Nav.Item>
            </Nav>
            <Container
                style={{ position: "absolute", right: "1%", width: "auto" }}
            >
                <SignedOutLinks />
            </Container>
        </NavBar>
*/

export default NavCom;
