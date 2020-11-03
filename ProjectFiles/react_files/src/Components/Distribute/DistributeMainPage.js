import React from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// React Router
import { Link } from 'react-router-dom';

const DistributeMainPage = () => {
    return (
        <Container fluid>
            <Row>
                <Col><h1 className="Title">Distribute Main Page</h1></Col>
            </Row>

            <Row>
                <Col xs={12} lg={6} style={{marginTop: "4px"}}>
                    <Link style={{textDecoration: "none"}} to='/Distribute/Rent'>
                        <Button variant="primary" size="lg" block style={{borderColor: '#ffffff'}}>
                            <h1>Distribute Rent</h1>
                        </Button>
                    </Link>
                </Col>
                <Col xs={12} lg={6} style={{marginTop: "4px"}}>
                    <Link style={{textDecoration: "none"}} to='/Distribute/Goods'>
                        <Button variant="primary" size="lg" block style={{borderColor: '#ffffff'}}>
                            <h1>Distribute Goods</h1>
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default DistributeMainPage;
