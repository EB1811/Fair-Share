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
                <Row className="w-100 justify-content-center" style={{marginBottom: "12.5%", padding: "4% 0 6% 0"}}>
                    <Col xs={12} lg={10}>
                        <DistributeEntry goodType={"Goods"}/>
                    </Col>
                </Row>
            </Row>
        </Container>
    )
}

export default DistributeGoodsPage;
