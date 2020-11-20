import React from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

// Images
import bgImg from '../../Images/group-division-rent-happy.jpg';

// React Router
import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <div>
        <Container fluid style={{height: "100vh", backgroundImage: `url(${bgImg})`, position: "absolute"}} className="bgImage"/>
        <Container fluid style={{height: "100vh"}}>
            <Row className="align-items-center h-100">
                <Col xs="12" style={{marginTop: "5%"}}><h1 className="Title">CE301 Project</h1></Col>
                <Col xs="12">
                    <Link style={{textDecoration: "none"}} to='/Distribute'>
                        <Button variant="primary" size="lg" style={{borderColor: '#ffffff'}}>
                            <h1>Begin</h1>
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default MainPage;
