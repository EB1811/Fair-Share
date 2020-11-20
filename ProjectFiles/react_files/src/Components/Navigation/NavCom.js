import React from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import NavBar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';

// React Router
import { Link } from 'react-router-dom';

const NavCom = () => {
    return (
        <Container fluid>
            <NavBar fixed="top" variant="dark" style={{backgroundColor: "#ffffff"}}>
                <Nav className="justify-content-center" style={{ flex: 1, fontSize: "1.15em", paddingBottom: "10px", borderBottom: "1.5px solid #ff3b3f"}}>
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
            </NavBar>
        </Container>
    )
}

export default NavCom;
