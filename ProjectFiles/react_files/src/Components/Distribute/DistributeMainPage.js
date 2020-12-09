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
        <Container fluid className="h-100 divBlockWithContentPrimary">
        <Row className="align-items-center h-100 justify-content-center">
        <div className="h-100 w-100 d-flex flex-column">
            <Row className="justify-content-center w-100"  style={{marginTop: "25px", marginRight: "0", marginLeft: "0"}}>
                <h1 className="Title">What would you like to share?</h1>
            </Row>
        

            <Row className="w-100 justify-content-center flex-grow-1" style={{margin: "0", marginTop:"10.65%", padding: "3% 0 4% 0", backgroundColor: "#fff"}}>
                <Row className="w-50" style={{marginBottom: "4%"}}>
                    <Col xs={12} lg={6}>
                        <img src={logo} alt="icon-house-rent" style={{width: "200px", height: "200px", marginBottom: "2%"}}/>
                        <Link style={{textDecoration: "none"}} to='/Distribute/Rent'>
                            <Button variant="primary" size="lg" block style={{borderColor: '#ffffff'}}>
                                <h2>Share Rent</h2>
                            </Button>
                        </Link>
                    </Col>
                    <Col xs={12} lg={6}>
                        <img src={logo2} alt="icon-jewelry-goods" style={{width: "150px", height: "200px", marginBottom: "2%"}}/>
                        <Link style={{textDecoration: "none"}} to='/Distribute/Goods'>
                            <Button variant="primary" size="lg" block style={{borderColor: '#ffffff'}}>
                                <h2>Share Goods</h2>
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Row>
        </div>
        </Row>
        </Container>
    )
}

export default DistributeMainPage;
