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
        <Container fluid style={{height: "100vh"}}>
            <Row className="justify-content-center align-items-center h-100 divBlockWithContentPrimary">
                <Col xs="12" style={{margin: "2% 0"}}>
                    <h1 className="Title">Results</h1>
                </Col>
                <Row className="w-100 divBlockWithContentSecondary justify-content-center" style={{marginBottom: "12.5%", padding: "4% 0 6% 0"}}>
                    <Col sm="6">
                        {resultsArr.map((result) => 
                            <h1 key={result.id}>
                                {result.user}: {result.good} at £{result.price}
                            </h1>
                        )}
                    </Col>
                </Row>
            </Row>
        </Container>
    )
}

export default ResultsPage;
