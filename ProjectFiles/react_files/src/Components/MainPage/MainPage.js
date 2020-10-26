import React from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

// React Router
import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <Container fluid>
            <Container fluid>
                <h1 className="Title">
                    CE301 Project
                </h1>
            </Container>

            <Container fluid>
                <Button variant="primary" size="lg" block>
                    <Link style={{textDecoration: "none"}} to='/Learn'><h1>Learn</h1></Link>
                </Button>
                <Button btn="custom1" variant="primary" size="lg" block>
                    <Link style={{textDecoration: "none"}} to='/Distribute'><h1>Distribute</h1></Link>
                </Button>
            </Container>
        </Container>
    )
}

export default MainPage;
