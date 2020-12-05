import React from 'react';

// Router
import { NavLink } from 'react-router-dom';

// Bootstrap Components
import Nav from 'react-bootstrap/Nav';


const SignedOutLinks = (props) => {
    return (
        <Nav className="justify-content-end" style={{ flex: 1, fontSize: "1em"}}>
            <Nav.Item>
                <NavLink className="nav-link" style={{textDecoration: "none"}} to='/Login'>Login</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink className="nav-link" style={{textDecoration: "none"}} to='/CreateAccount'>Create Account</NavLink>
            </Nav.Item>
        </Nav>
    )
}

export default (SignedOutLinks);