import React from "react";

// React Components
//import SignedInLinks from './SignedInLinks';
import SignedOutLinks from "./SignedOutLinks";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import NavBar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";

// React Router
import { Link } from "react-router-dom";

//TODO: Add conditional formatting once server is made.

const NavCom = () => {
    return (
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
    );
};

export default NavCom;
