import React from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Own Components
import DistributeEntry from './DistributeEntry';

const DistributeRentPage = () => {
    return (
        <Container fluid style={{height: "100vh"}}>
            <Row className="align-items-center h-100 justify-content-center divBlockWithContentPrimary">
                <Col xs="12" style={{margin: "2% 0"}}>
                    <h1>House Information</h1>
                </Col>

                <Row className="w-100 divBlockWithContentSecondary justify-content-center" style={{marginBottom: "12.5%", padding: "4% 0 6% 0"}}>
                    <Col xs={12} lg={10}>
                        <DistributeEntry goodType={"Rent"}/>
                    </Col>
                </Row>
            </Row>
        </Container>
    )
}

export default DistributeRentPage;
