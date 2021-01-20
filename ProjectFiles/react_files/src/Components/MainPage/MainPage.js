import React from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Icons
import logo1 from '../../Images/fair_ICON.svg';
import logo2 from '../../Images/team_ICON.svg';
import logo3 from '../../Images/check_ICON.svg';
import logo4 from '../../Images/house_ICON.svg';
import logo5 from '../../Images/jewelry_ICON.svg';

import image from '../../Images/trees-house-snow-letterbox-color.png';

// React Router
import { Link } from 'react-router-dom';

/*
Renting an apartment with your friends can be tricky.
How do you decide who gets what room without anyone feeling upset. 
Our algorithms devise an allocation of rooms that is mathematically fair.
*/

const MainPage = () => {
    return (
        <Container fluid className="min-vh-100">
            <Row className="justify-content-center align-items-center divBlockWithContentTitle p-4 backTitleImage" style={{minHeight: "40vh", backgroundImage: `url(${image})`}}>
                <Col xs="12" md="5" style={{backgroundColor: "#ffffff50"}}>
                    <h1 className="Title w-100">Fair / Share</h1>
                    <h2 className="descText mt-2">Our service helps you solve day-to-day sharing problems using mathmatical algorithms that are tailored to you.</h2>
                </Col>
            </Row>

            <Row className="justify-content-center align-items-center p-4" style={{minHeight: "55vh", backgroundColor: "#fff"}}>
                <Row style={{maxWidth: "950px", minWidth: "300px"}}>
                    <Col xs="12" sm="4">
                        <img src={logo1} alt="icon-fair-division" style={{width: "125px", height: "125px"}}/>
                        <h1 className="iconDesc">Fair</h1>
                        <p className="iconDescSmall">Our algorithms results in mathematically proven fair allocations.</p>
                    </Col>
                    <Col xs="12" sm="4">
                        <img src={logo2} alt="icon-team-diverse" style={{width: "125px", height: "125px"}}/>
                        <h1 className="iconDesc">Personalised</h1>
                        <p className="iconDescSmall">You decide which of our many algorithms to use, based on your preferences.</p>
                    </Col>
                    <Col xs="12" sm="4">
                        <img src={logo3} alt="icon-check-star" style={{width: "125px", height: "125px"}}/>
                        <h1 className="iconDesc">Easy</h1>
                        <p className="iconDescSmall">Our service is as quick and straightforward to use as possible.</p>
                    </Col>
                </Row>
                <div className="w-100">
                    <Link style={{textDecoration: "none"}} to='/Distribute'>
                        <Button variant="secondary" size="lg">
                            <h1>Begin</h1>
                        </Button>
                    </Link>
                </div>
            </Row>

            <Row className="justify-content-center divBlockWithContentPrimary align-items-center p-4" style={{minHeight: "55vh"}}>
                <div className="w-50" style={{maxWidth: "950px"}}>
                    <h2 className="descText w-100">We can help you</h2>
                    <Row className="mt-5">
                        <Col style={{display: "inline"}}>
                            <img src={logo4} alt="icon-house-rent" style={{width: "125px", height: "125px"}}/>
                            <h1 className="iconDesc2">Share Rent</h1>
                        </Col>
                        <Col style={{display: "inline"}}>
                            <img src={logo5} alt="icon-jewelry-goods" style={{width: "125px", height: "125px"}}/>
                            <h1 className="iconDesc2">Share Goods</h1>
                        </Col>
                    </Row>
                    <h2 className="descText w-100 mt-5">in an impartial way.</h2>
                    <h2 className="descTextBig w-100">Guaranteed.</h2>
                </div>
            </Row>

            <Row className="justify-content-center divBlockWithContentSecondary align-items-center p-4" style={{minHeight: "55vh"}}>
                <Container style={{maxWidth: "1200px"}}>
                    <Col xs="12">
                        <h2 className="descText">How it works?</h2>
                        <h1 className="descTextBig greenText">Simple</h1>
                    </Col>
                    <hr/>
                    <Row className="mt-5">
                        <Col sm="3">
                            <h3 className="descText">1. Enter info about your items and group.</h3>
                        </Col>
                        <Col sm="3">
                            <h3 className="descText">2. Complete a short questionnaire.</h3>
                        </Col>
                        <Col sm="3">
                            <h3 className="descText">3. Value each item.</h3>
                        </Col>
                        <Col sm="3">
                            <h3 className="descText">4. See who gets what.</h3>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </Container>
    )
}

export default MainPage;
