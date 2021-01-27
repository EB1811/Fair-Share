import React from "react";

// Router
import { Link } from "react-router-dom";

// Bootstrap Components
import Nav from "react-bootstrap/Nav";

//TODO: Add conditional formatting once server is made.

const SignedOutLinks = (props) => {
    return (
        <Nav className='justify-content-end' style={{ flex: 1 }}>
            <Nav.Item>
                <Link
                    className='nav-link'
                    style={{ textDecoration: "none" }}
                    to='/Login'
                >
                    Login
                </Link>
            </Nav.Item>
            <Nav.Item>
                <Link
                    className='nav-link'
                    style={{ textDecoration: "none" }}
                    to='/CreateAccount'
                >
                    Create Account
                </Link>
            </Nav.Item>
        </Nav>
    );
};

export default SignedOutLinks;
