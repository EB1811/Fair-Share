import React from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const LearnMainPage = () => {
    return (
        <Container fluid style={{height: "100vh"}}>
            <Row className="align-items-center h-100 justify-content-center divBlockWithContentPrimary">
                <Col xs="12" style={{marginBottom: "25%"}}><h1 className="Title">Learn Main Page</h1></Col>
            </Row>
        </Container>
    )
}

export default LearnMainPage;
