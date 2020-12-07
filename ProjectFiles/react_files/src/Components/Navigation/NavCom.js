import React from 'react'

// React Components
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import NavBar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';

// React Router
import { Link } from 'react-router-dom';

const NavCom = () => {
    return (
        <Container fluid>
            <NavBar fixed="top" variant="dark" style={{backgroundColor: "#ff4e51"}}>
                <Nav className="justify-content-md-center" style={{ flex: 1, fontSize: "1.15em"}}>
                    <Nav.Item>
                        <Link className="nav-link" style={{textDecoration: "none"}} to='/'>Home</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link className="nav-link" style={{textDecoration: "none"}} to='/Learn'>Learn</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link className="nav-link" style={{textDecoration: "none"}} to='/Distribute'>Distribute</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link className="nav-link" style={{textDecoration: "none"}} to='/'>About</Link>
                    </Nav.Item>
                </Nav>
                <Container style={{position: "absolute", right: "1%", width: "auto"}}>
                    <SignedOutLinks/>
                </Container>
            </NavBar>
        </Container>
    )
}

export default NavCom;
