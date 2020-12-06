import React from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Images
import bgImg from '../../Images/group-division-rent-happy.jpg';
import logo1 from '../../Images/fair_ICON2.svg';

// React Router
import { Link } from 'react-router-dom';

const MainPage = () => {
    // ADD ATTRIBUTIONS:
    // <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

    return (
        <div>
        <Container fluid style={{height: "100vh", backgroundImage: `url(${bgImg})`, position: "absolute"}} className="bgImage"/>
        <Container fluid style={{height: "100vh"}}>
            <Row className="align-items-center h-100 justify-content-sm-center">
                <Col xs="12" style={{marginTop: "1.5%"}}><h1 className="Title">CE301 Project</h1></Col>
                <Row className="w-50" style={{marginTop: ""}}>
                    <Col style={{display: "inline"}}>
                        <img src={logo1} alt="icon-fair-division" style={{width: "125px", height: "125px"}}/>
                        <h1 className="iconDesc">Fair</h1>
                    </Col>
                    <Col style={{display: "inline"}}>
                        <img src={logo1} alt="icon-fair-division" style={{width: "125px", height: "125px"}}/>
                        <h1 className="iconDesc">Personalised</h1>
                    </Col>
                    <Col style={{display: "inline"}}>
                        <img src={logo1} alt="icon-fair-division" style={{width: "125px", height: "125px"}}/>
                        <h1 className="iconDesc">Easy</h1>
                    </Col>
                </Row>
                <Col xs="12" style={{marginTop: "1%"}}>
                    <Link style={{textDecoration: "none"}} to='/Distribute'>
                        <Button variant="primary" size="lg" style={{borderColor: '#ffffff'}}>
                            <h1 style={{}}>Begin</h1>
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default MainPage;
