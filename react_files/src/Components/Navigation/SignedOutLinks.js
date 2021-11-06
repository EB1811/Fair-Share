import React from "react";

// Router
import { NavLink } from "react-router-dom";

// Bootstrap Components
import Nav from "react-bootstrap/Nav";

//TODO: Add conditional formatting once server is made.

const SignedOutLinks = (props) => {
    return (
        <Nav className='justify-content-end' style={{ flex: 1 }}>
            <span style={{ padding: "0.5rem", color: "#777777" }}>|</span>
            <Nav.Item>
                <NavLink
                    className='nav-link'
                    style={{ textDecoration: "none" }}
                    to='/Login'
                    onClick={() =>
                        setTimeout(() => {
                            props.setExpanded(false);
                        }, 50)
                    }
                >
                    Login
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink
                    className='nav-link'
                    style={{ textDecoration: "none", cursor: "pointer" }}
                    to='/CreateAccount'
                    onClick={() =>
                        setTimeout(() => {
                            props.setExpanded(false);
                        }, 50)
                    }
                >
                    Create Account
                </NavLink>
            </Nav.Item>
        </Nav>
    );
};

export default SignedOutLinks;