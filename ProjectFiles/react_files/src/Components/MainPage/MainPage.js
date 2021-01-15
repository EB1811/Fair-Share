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

// React Router
import { Link } from 'react-router-dom';

//TODO Change these so that they are 'blocks'. Dont set position with margins.
//TODO Change 'we can help you' block to be all in one row. Makes positioning and sizing easier. 

const MainPage = () => {
    return (
        <Container fluid className="min-vh-100">
            <Row className="justify-content-center align-items-center divBlockWithContentPrimary" style={{height: "45vh"}}>
                <Col>
                    <h1 className="Title w-100">CE301 Project</h1>
                    <h2 className="descText w-100 mt-4">Our service helps you solve day-to-day sharing problems using mathmatical algorithms that are tailored to you.</h2>
                </Col>
            </Row>

            <Row className="justify-content-center align-items-center" style={{height: "50vh", backgroundColor: "#fff"}}>
                <Row className="w-50">
                    <Col xs="12" sm="4">
                        <img src={logo1} alt="icon-fair-division" style={{width: "125px", height: "125px"}}/>
                        <h1 className="iconDesc">Fair</h1>
                    </Col>
                    <Col xs="12" sm="4">
                        <img src={logo2} alt="icon-team-diverse" style={{width: "125px", height: "125px"}}/>
                        <h1 className="iconDesc">Personalised</h1>
                    </Col>
                    <Col xs="12" sm="4">
                        <img src={logo3} alt="icon-check-star" style={{width: "125px", height: "125px"}}/>
                        <h1 className="iconDesc">Easy</h1>
                    </Col>
                </Row>
                <div className="w-100">
                    <Link style={{textDecoration: "none"}} to='/Distribute'>
                        <Button variant="secondary" size="lg" style={{borderColor: '#ffffff'}}>
                            <h1>Begin</h1>
                        </Button>
                    </Link>
                </div>
            </Row>

            <Row className="justify-content-center divBlockWithContentPrimary align-items-center" style={{height: "50vh"}}>
                <div className="w-50">
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
        </Container>
    )
}

export default MainPage;
