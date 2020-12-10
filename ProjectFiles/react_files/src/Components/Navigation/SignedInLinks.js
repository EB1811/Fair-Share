import React from 'react';

// Router
import { NavLink } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

// Bootstrap Components
import Nav from 'react-bootstrap/Nav';


const SignedInLinks = (props) => {
    return (
        <Nav className="justify-content-end" style={{ flex: 1, fontSize: "1em"}}>
            <Nav.Item>
                <NavLink className="nav-link" style={{textDecoration: "none"}} to='/Account'>User</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink className="nav-link" style={{textDecoration: "none"}} to='/'>Logout</NavLink>
            </Nav.Item>
        </Nav>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        // signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);