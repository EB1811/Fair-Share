import React from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// React Router
import { Link } from 'react-router-dom';

const ResultsPage = () => {
    return (
        <Container fluid>
            <Row>
                <Col><h1 className="Title">Results</h1></Col>
            </Row>
        </Container>
    )
}

export default ResultsPage;
