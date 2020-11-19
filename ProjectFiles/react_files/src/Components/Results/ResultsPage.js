import React, { useState } from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// React Router
import { Link } from 'react-router-dom';

const ResultsPage = () => {
    // Temp Results data. REDUX
    const [resultsArr, setResultsArr] = useState([
        { good: "Room 1", user: "Jon", price: 400, id: 1 },
        { good: "Room 2", user: "bob", price: 100, id: 2 },
        { good: "Room 3", user: "mif", price: 500, id: 3 }
    ]);

    return (
        <Container fluid>
            <Row>
                <Col><h1 className="Title">Results</h1></Col>
            </Row>
            <Row className="justify-content-sm-center">
                <Col sm="6">
                    {resultsArr.map((result) => 
                        <h1 key={result.id}>
                            {result.user}: {result.good} at £{result.price}
                        </h1>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default ResultsPage;
