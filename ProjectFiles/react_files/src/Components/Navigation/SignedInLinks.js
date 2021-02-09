import React from "react";

// Router
import { NavLink, withRouter } from "react-router-dom";

// Bootstrap Components
import Nav from "react-bootstrap/Nav";

// Redux
import { connect } from "react-redux";
// rrf
import { useFirebase } from "react-redux-firebase";

const SignedInLinks = (props) => {
    const firebase = useFirebase();
    const userLetter = props.profile.username ? props.profile.username : "";

    const logout = () => {
        firebase.logout().then(() => {
            props.logoutSuccess();
        });
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
                    {userLetter}
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

const mapDispatchToProps = (dispatch) => {
    return {
        logoutSuccess: () => {
            dispatch({ type: "LOGOUT_SUCCESS" });
        },
    };
};

export default withRouter(connect(null, mapDispatchToProps)(SignedInLinks));
