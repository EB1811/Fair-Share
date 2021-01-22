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

//TODO REDO THIS.

const DistributeMainPage = () => {
    return (
        <Container fluid className="divBlockWithContentPrimary">
        <Row className="align-items-center min-vh-100 justify-content-center">
        <div className="min-vh-100 w-100 d-flex flex-column">
            <Row className="justify-content-center w-100 align-items-center m-5">
                <Col>
                    <h1 className="Title">What would you like to do?</h1>
                </Col>
            </Row>
            <Row className="justify-content-center mt-5" xl="7">
                <h2 className="descText">Sharing a house with mates? <br/> Need to divide financial assets fairly? <br/> We can help.</h2>
            </Row>

            <Row className="w-100 align-items-center justify-content-center flex-grow-1" style={{margin: "0", marginTop:"5.85%", padding: "10px 0", backgroundColor: "#fff"}}>
                <Row className="w-50" style={{marginBottom: "4%"}}>
                    <Col xs={12} lg={6}>
                        <img src={logo} alt="icon-house-rent" style={{width: "200px", height: "200px", marginBottom: "2%"}}/>
                        <Link style={{textDecoration: "none"}} to='/Distribute/Rent'>
                            <Button variant="secondary" size="lg" block style={{borderColor: '#ffffff'}}>
                                <h2>Share Rent</h2>
                            </Button>
                        </Link>
                    </Col>
                    <Col xs={12} lg={6}>
                        <img src={logo2} alt="icon-jewelry-goods" style={{width: "150px", height: "200px", marginBottom: "2%"}}/>
                        <Link style={{textDecoration: "none"}} to='/Distribute/Goods'>
                            <Button variant="secondary" size="lg" block style={{borderColor: '#ffffff'}}>
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
