import React from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

// React Router
import { Link } from 'react-router-dom';

const DistributeMainPage = () => {
    return (
        <Container fluid>
            <Container fluid>
                <h1 className="Title">
                    Distribute Main Page
                </h1>
            </Container>

            <Container fluid>
                <Link style={{textDecoration: "none"}} to='/Distribute/Rent'>
                    <Button variant="primary" size="lg" block style={{borderColor: '#EB7C87'}}>
                        <h1>Distribute Rent</h1>
                    </Button>
                </Link>
                <Link style={{textDecoration: "none"}} to='/Distribute/Goods'>
                    <Button variant="primary" size="lg" block style={{borderColor: '#EB7C87'}}>
                        <h1>Distribute Goods</h1>
                    </Button>
                </Link>
            </Container>
        </Container>
    )
}

export default DistributeMainPage;
