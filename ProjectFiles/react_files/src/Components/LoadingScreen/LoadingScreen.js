import React from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

const LoadingScreen = () => {
    return (
        <Container fluid className='divBlockWithContentTertiary min-vh-100'>
            <Row className='justify-content-center align-items-center min-vh-100'>
                <Spinner animation='border' role='status' variant='primary'>
                    <span className='sr-only'>Loading...</span>
                </Spinner>
            </Row>
        </Container>
    );
};

export default LoadingScreen;
