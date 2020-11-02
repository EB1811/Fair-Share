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
                <Link style={{textDecoration: "none"}} to='/Learn'>
                    <Button variant="primary" size="lg" block style={{borderColor: '#EB7C87'}}>
                        <h1>Learn</h1>
                    </Button>
                </Link>
                <Link style={{textDecoration: "none"}} to='/Distribute'>
                    <Button variant="primary" size="lg" block style={{borderColor: '#EB7C87'}}>
                        <h1>Distribute</h1>
                    </Button>
                </Link>
            </Container>
        </Container>
    )
}

export default MainPage;
