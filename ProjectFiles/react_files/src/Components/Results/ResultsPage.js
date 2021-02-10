import React, { useState, useEffect } from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// Redux
import { connect } from "react-redux";

// React Router
import { Link } from "react-router-dom";

const ResultsPage = (props) => {
    console.log(props.stateAllocations);
    return (
        <Container fluid className='divBlockWithContentTertiary min-vh-100'>
            <Row className='justify-content-center align-items-center min-vh-100'>
                <Col
                    xs={10}
                    sm={8}
                    md={7}
                    lg={6}
                    className='centerCardCompact m-3'
                    style={{ maxWidth: "700px" }}
                >
                    <h4>Results</h4>
                    <Col sm='12 mt-5'>
                        {props.stateAllocations.map((user) => (
                            <p key={user.email}>
                                {user.username}: {user.alloGoods}
                            </p>
                        ))}
                    </Col>
                    <Link style={{ textDecoration: "none" }} to='/'>
                        <Button variant='primary' size='sm' className='mt-5'>
                            <span className='smButtonText'>Share Again</span>
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

// To access and modify redux store.
const mapStateToProps = (state) => {
    return {
        stateAllocations: state.distGroupInfo.allocations,
    };
};

export default connect(mapStateToProps)(ResultsPage);
