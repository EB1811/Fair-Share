import React from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Images
import logo1 from '../../Images/fair_ICON.svg';
import logo2 from '../../Images/team_ICON.svg';
import logo3 from '../../Images/check_ICON.svg';
import logo4 from '../../Images/house_ICON.svg';
import logo5 from '../../Images/jewelry_ICON.svg';

// React Router
import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <div>
        <Container fluid style={{minHeight: "100vh"}}>
            <Row className="align-items-center h-100 justify-content-center divBlockWithContentPrimary">
                <Row className="justify-content-center w-100"  style={{marginTop: "25px"}}>
                    <h1 className="Title">CE301 Project</h1>
                </Row>
                <Col className="justify-content-center" xl="7">
                    <h2 className="descText">Our service helps you solve day-to-day sharing problems using mathmatical algorithms that are tailored to you.</h2>
                </Col>

                <Row className="w-100 justify-content-center" style={{marginTop: "7.3%", padding: "3% 0 3% 0", backgroundColor: "#fff", zIndex: "10"}}>
                    <Row className="w-50" style={{marginBottom: "2.5%"}}>
                        <Col style={{display: "inline", marginTop: ""}}>
                            <img src={logo1} alt="icon-fair-division" style={{width: "125px", height: "125px"}}/>
                            <h1 className="iconDesc">Fair</h1>
                        </Col>
                        <Col style={{display: "inline"}}>
                            <img src={logo2} alt="icon-team-diverse" style={{width: "125px", height: "125px"}}/>
                            <h1 className="iconDesc">Personalised</h1>
                        </Col>
                        <Col style={{display: "inline"}}>
                            <img src={logo3} alt="icon-check-star" style={{width: "125px", height: "125px"}}/>
                            <h1 className="iconDesc">Easy</h1>
                        </Col>
                    </Row>
                    <Col xs="12" style={{marginTop: "3%"}}>
                        <Link style={{textDecoration: "none"}} to='/Distribute'>
                            <Button variant="secondary" size="lg" style={{borderColor: '#ffffff'}}>
                                <h1 style={{}}>Begin</h1>
                            </Button>
                        </Link>
                    </Col>
                </Row>

                <Row className="w-100 justify-content-center divBlockWithContentPrimary" style={{padding: "3% 0 3% 0", zIndex: "10"}}>
                    <Col className="justify-content-center" xl="7">
                        <h2 className="descText">We can help you</h2>
                    </Col>
                    <Row className="w-50" style={{margin: "1% 0 3% 0"}}>
                        <Col style={{display: "inline"}}>
                            <img src={logo4} alt="icon-house-rent" style={{width: "125px", height: "125px"}}/>
                            <h1 className="iconDesc2">Share Rent</h1>
                        </Col>
                        <Col style={{display: "inline"}}>
                            <img src={logo5} alt="icon-jewelry-goods" style={{width: "125px", height: "125px"}}/>
                            <h1 className="iconDesc2">Share Goods</h1>
                        </Col>
                    </Row>
                    <Col className="justify-content-center" xl="7">
                        <h2 className="descText">in an impartial way.</h2>
                    </Col>
                    <Col className="justify-content-center" xl="7">
                        <h2 className="descTextBig">Guaranteed.</h2>
                    </Col>
                </Row>
            </Row>
        </Container>
        </div>
    )
}

export default MainPage;
