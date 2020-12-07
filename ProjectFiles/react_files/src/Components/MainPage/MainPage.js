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
    // ADD ATTRIBUTIONS:
    // <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

    return (
        <div>
        <Container fluid style={{height: "100vh"}}>
            <Row className="align-items-center h-100 justify-content-center divBlockWithContentPrimary">
                <Col xs="12" style={{marginTop: "4.5%"}}><h1 className="Title">CE301 Project</h1></Col>

                <Row className="w-100 justify-content-center" style={{marginTop: "7%", padding: "3% 0 3% 0", backgroundColor: "#fff", zIndex: "10"}}>
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
                    <Col xs="12" style={{margin: "3% 0"}}>
                        <Link style={{textDecoration: "none"}} to='/Distribute'>
                            <Button variant="secondary" size="lg" style={{borderColor: '#ffffff'}}>
                                <h1 style={{}}>Begin</h1>
                            </Button>
                        </Link>
                    </Col>
                </Row>

                <Row className="w-100 justify-content-center divBlockWithContentPrimary" style={{padding: "10% 0 2% 0", zIndex: "10"}}>
                    <Row className="w-50" style={{marginBottom: "3%"}}>
                        <Col style={{display: "inline"}}>
                            <img src={logo4} alt="icon-house-rent" style={{width: "125px", height: "125px"}}/>
                            <h1 className="iconDesc2">Share Rent</h1>
                        </Col>
                        <Col style={{display: "inline"}}>
                            <img src={logo5} alt="icon-jewelry-goods" style={{width: "125px", height: "125px"}}/>
                            <h1 className="iconDesc2">Share Goods</h1>
                        </Col>
                    </Row>
                </Row>

                <Row className="w-100 justify-content-center" style={{padding: "10% 0 5% 0", backgroundColor: "#303030", zIndex: "10"}}>
                    <Row className="w-50" style={{marginBottom: "3%"}}>
                        <Col style={{display: "inline"}}>
                            <img src={logo1} alt="icon-fair-division" style={{width: "125px", height: "125px"}}/>
                            <h1 className="iconDesc">Footer</h1>
                        </Col>
                    </Row>
                </Row>
            </Row>
        </Container>
        </div>
    )
}

export default MainPage;
