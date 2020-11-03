import React from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';

// React Router
import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <div>
        <Container fluid>
            <Row>
                <Col><h1 className="Title">CE301 Project</h1></Col>
            </Row>

            <Row>
                <Col xs={12} lg={6} style={{marginTop: "4px"}}>
                    <Link style={{textDecoration: "none"}} to='/Learn'>
                        <Button variant="primary" size="lg" block style={{borderColor: '#ffffff'}}>
                            <h1>Learn</h1>
                        </Button>
                    </Link>
                </Col>
                <Col xs={12} lg={6} style={{marginTop: "4px"}}>
                    <Link style={{textDecoration: "none"}} to='/Distribute'>
                        <Button variant="primary" size="lg" block style={{borderColor: '#ffffff'}}>
                            <h1>Distribute</h1>
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>

        <Container fluid>
            <NavBar fixed="bottom" variant="dark">
                <Nav className="justify-content-center" style={{ flex: 1}}>
                    <Nav.Item>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/">Collection</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/">Contact</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/">Blog</Nav.Link>
                    </Nav.Item>
                </Nav>
            </NavBar>
        </Container>
        </div>
    )
}

export default MainPage;
