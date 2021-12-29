import React, { useState } from 'react'

// React Components
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
import NavBar from 'react-bootstrap/NavBar'
import Nav from 'react-bootstrap/Nav'

// React Router
import { NavLink, Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/NavBar'

// Redux
import { connect } from 'react-redux'

//TODO: [A301212-113] Collapse navbar when link is selected.

const NavCom = (props) => {
    const [expanded, setExpanded] = useState(false)

    return (
        <NavBar
            expanded={expanded}
            expand='md'
            style={{
                backgroundColor: '#6daffe',
                boxShadow: '0 1px 3px #5798e6',
                zIndex: 1000,
                fontSize: '16px',
                fontWeight: '500',
                top: 0,
            }}
            variant='light'
        >
            <Container>
                <Navbar.Brand>
                    <Link style={{ textDecoration: 'none' }} to='/'>
                        <span className='brandName'>
                            Split
                            <span style={{ color: '#0555b6' }}>Sum</span>
                        </span>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls='basic-navbar-nav'
                    onClick={() => setExpanded(expanded ? false : 'expanded')}
                />
                <Navbar.Collapse id='basic-navbar-nav' className='ml-3'>
                    <Nav className='ml-auto'>
                        <NavLink
                            className='nav-link'
                            style={{
                                padding: '10px 0 10px 30px',
                                transition: '0.2s',
                            }}
                            exact
                            to='/'
                            onClick={() =>
                                setTimeout(() => {
                                    setExpanded(false)
                                }, 50)
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            className='nav-link'
                            style={{
                                padding: '10px 0 10px 30px',
                                transition: '0.2s',
                            }}
                            exact
                            to='/Learn'
                            onClick={() =>
                                setTimeout(() => {
                                    setExpanded(false)
                                }, 50)
                            }
                        >
                            Learn
                        </NavLink>
                        {/* <span
                            style={{
                                padding: "10px 0 10px 30px",
                                color: "#fff",
                            }}
                        >
                            |
                        </span>

                        <span
                            style={{
                                display: "block",
                                padding: "10px 0 10px 30px",
                                fontWeight: "500",
                                color: "#fff",
                            }}
                        >
                            Share:
                        </span>
                        <NavLink
                            className='nav-link'
                            style={{
                                padding: "10px 0 10px 30px",
                                transition: "0.2s",
                            }}
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
                            style={{
                                padding: "10px 0 10px 30px",
                                transition: "0.2s",
                            }}
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
                            style={{
                                padding: "10px 0 10px 30px",
                                transition: "0.2s",
                            }}
                            to='/Distribute/localremote/Divorce'
                            onClick={() =>
                                setTimeout(() => {
                                    setExpanded(false);
                                }, 50)
                            }
                        >
                            Finances
                        </NavLink>
                        {props.authStatus.isLoaded &&
                            (props.authStatus.uid ? (
                                <SignedInLinks
                                    profile={props.profile}
                                    setExpanded={setExpanded}
                                />
                            ) : (
                                <SignedOutLinks setExpanded={setExpanded} />
                            ))} */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </NavBar>
    )
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        authStatus: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

export default connect(mapStateToProps)(NavCom)
