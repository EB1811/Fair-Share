import React from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Images
import logo from '../../Images/house_ICON.svg';
import logo2 from '../../Images/jewelry_ICON.svg';

// React Router
import { Link } from 'react-router-dom';

const DistributeMainPage = () => {
    return (
        <Container fluid style={{height: "100vh"}}>
        <Row className="align-items-center h-100 justify-content-center" style={{backgroundColor: "#ff4e51"}}>
            <Col xs="12" style={{marginTop: "4%"}}>
                <h1 className="Title">Distribute Main Page</h1>
            </Col>
        

            <Row className="w-100 justify-content-center" style={{marginTop: "6%", padding: "3% 0 4% 0", backgroundColor: "#fff"}}>
                <Row className="w-50" style={{marginBottom: "4%"}}>
                    <Col xs={12} lg={6}>
                        <img src={logo} alt="icon-house-rent" style={{width: "200px", height: "200px", marginBottom: "2%"}}/>
                        <Link style={{textDecoration: "none"}} to='/Distribute/Rent'>
                            <Button variant="primary" size="lg" block style={{borderColor: '#ffffff'}}>
                                <h2>Distribute Rent</h2>
                            </Button>
                        </Link>
                    </Col>
                    <Col xs={12} lg={6}>
                        <img src={logo2} alt="icon-jewelry-goods" style={{width: "150px", height: "200px", marginBottom: "2%"}}/>
                        <Link style={{textDecoration: "none"}} to='/Distribute/Goods'>
                            <Button variant="primary" size="lg" block style={{borderColor: '#ffffff'}}>
                                <h2>Distribute Goods</h2>
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Row>
        </Row>
        </Container>
    )
}

export default DistributeMainPage;
