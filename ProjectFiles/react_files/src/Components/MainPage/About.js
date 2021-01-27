import React from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const About = () => {
    return (
        <Container
            fluid
            className='h-100 divBlockWithContentPrimary'
            style={{ height: "100vh" }}
        >
            <Row>
                <Col xs={12} lg={12} style={{ marginTop: "25px" }}>
                    <h2>
                        This website was created as part of my final year
                        project.
                    </h2>
                </Col>
                <Col xs={12} lg={12} style={{ marginTop: "25px" }}>
                    <h2>Created by: Emmanuils Borovikovs</h2>
                    <h2>Email: eb18847@essex.ac.uk</h2>
                </Col>
            </Row>
        </Container>
    );
};

export default About;
