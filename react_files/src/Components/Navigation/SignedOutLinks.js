import React from "react";

// Router
import { NavLink } from "react-router-dom";

// Bootstrap Components
import Nav from "react-bootstrap/Nav";

//TODO: Add conditional formatting once server is made.

const SignedOutLinks = (props) => {
    return (
        <Nav className='justify-content-end' style={{ flex: 1 }}>
            <span style={{ padding: "10px 0 10px 30px", color: "#fff" }}>
                |
            </span>
            <Nav.Item>
                <NavLink
                    className='nav-link'
                    style={{
                        textDecoration: "none",
                        padding: "10px 0 10px 30px",
                        transition: "0.2s",
                    }}
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
                    style={{
                        textDecoration: "none",
                        cursor: "pointer",
                        padding: "10px 0 10px 30px",
                        transition: "0.2s",
                    }}
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
