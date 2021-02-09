import React from "react";

// Router
import { NavLink, withRouter } from "react-router-dom";

// Bootstrap Components
import Nav from "react-bootstrap/Nav";

// rrf
import { useFirebase } from "react-redux-firebase";

const SignedInLinks = (props) => {
    const firebase = useFirebase();

    const logout = () => {
        firebase.logout();

        props.history.push("/");
    };

    return (
        <Nav className='justify-content-end' style={{ flex: 1 }}>
            <span style={{ padding: "0.5rem", color: "#777777" }}>|</span>
            <Nav.Item>
                <NavLink
                    className='nav-link'
                    style={{ textDecoration: "none" }}
                    to='/Account'
                >
                    User
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <span
                    onClick={logout}
                    className='nav-link'
                    style={{ cursor: "pointer" }}
                >
                    Logout
                </span>
            </Nav.Item>
        </Nav>
    );
};

export default withRouter(SignedInLinks);
