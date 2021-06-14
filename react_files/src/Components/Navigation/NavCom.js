import React, { useState } from "react";

// React Components
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import NavBar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";

// React Router
import { NavLink, Link } from "react-router-dom";
import Navbar from "react-bootstrap/NavBar";

// Redux
import { connect } from "react-redux";

//TODO: [A301212-113] Collapse navbar when link is selected.

const NavCom = (props) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <NavBar
            expanded={expanded}
            expand='md'
            style={{ backgroundColor: "#fff" }}
            variant='light'
        >
            <Container fluid>
                <Navbar.Brand>
                    <Link style={{ textDecoration: "none" }} to='/'>
                        <span className='brandName'>Fair / Share</span>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls='basic-navbar-nav'
                    onClick={() => setExpanded(expanded ? false : "expanded")}
                />
                <Navbar.Collapse id='basic-navbar-nav' className='ml-3'>
                    <Nav className='mr-auto'>
                        <NavLink
                            className='nav-link'
                            exact
                            to='/'
                            onClick={() =>
                                setTimeout(() => {
                                    setExpanded(false);
                                }, 50)
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            className='nav-link'
                            exact
                            to='/Learn'
                            onClick={() =>
                                setTimeout(() => {
                                    setExpanded(false);
                                }, 50)
                            }
                        >
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
                            to='/Distribute/localremote/Rent'
                            onClick={() =>
                                setTimeout(() => {
                                    setExpanded(false);
                                }, 50)
                            }
                        >
                            Rent
                        </NavLink>
                        <NavLink
                            className='nav-link'
                            to='/Distribute/localremote/Goods'
                            onClick={() =>
                                setTimeout(() => {
                                    setExpanded(false);
                                }, 50)
                            }
                        >
                            Goods
                        </NavLink>
                        <NavLink
                            className='nav-link'
                            to='/Distribute/localremote/Divorce'
                            onClick={() =>
                                setTimeout(() => {
                                    setExpanded(false);
                                }, 50)
                            }
                        >
                            Finances
                        </NavLink>
                    </Nav>
                    {props.authStatus.isLoaded &&
                        (props.authStatus.uid ? (
                            <SignedInLinks
                                profile={props.profile}
                                setExpanded={setExpanded}
                            />
                        ) : (
                            <SignedOutLinks setExpanded={setExpanded} />
                        ))}
                </Navbar.Collapse>
            </Container>
        </NavBar>
    );
};

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        authStatus: state.firebase.auth,
        profile: state.firebase.profile,
    };
};

export default connect(mapStateToProps)(NavCom);
