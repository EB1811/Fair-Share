import React from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Own Components
import DistributeEntry from './DistributeEntry';

const DistributeGoodsPage = () => {
    return (
        <Container fluid style={{height: "100vh"}}>
            <Row className="align-items-center h-100 justify-content-center divBlockWithContentPrimary">
                <Col xs="12" style={{marginTop: "4.5%"}}>
                    <h1 className="Title">Distribute Goods Page</h1>
                </Col>

                <Row className="w-100 divBlockWithContentSecondary justify-content-center" style={{marginTop: "5.15%", padding: "4% 0 10% 0"}}>
                    <Col xs={12} lg={10}>
                        <DistributeEntry goodType={"Goods"}/>
                    </Col>
                </Row>
            </Row>
        </Container>
    )
}

export default DistributeGoodsPage;
