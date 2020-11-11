import React from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// React Router
import { Link } from 'react-router-dom';

const DistributeEntry = (props) => {
    return (
        <Container fluid>
            <Row>
                <Col><h1 className="Title">{props.goodType} Entry</h1></Col>
            </Row>
        </Container>
    )
}

export default DistributeEntry;
