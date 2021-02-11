import React, { useState } from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { Redirect } from "react-router-dom";

import { useSelector } from "react-redux";

// Redux
import { connect } from "react-redux";

const AccountBoard = (props) => {
    //! Temp data. Change once server is set up.
    const [valArr] = useState([
        { name: "Valuation 1" },
        { name: "Valuation 2" },
        { name: "Valuation 3" },
        { name: "Valuation 4" },
    ]);
    // Getting from store.
    const authLoaded = useSelector((state) => state.firebase.auth.isLoaded);
    const authId = useSelector((state) => state.firebase.auth.uid);

    if (authLoaded) {
        if (authId) {
            return (
                <Container
                    fluid
                    className='divBlockWithContentTertiary'
                    style={{ minHeight: "100vh" }}
                >
                    <Row className='justify-content-center'>
                        <Col>
                            <div
                                style={{
                                    minWidth: "200px",
                                    minHeight: "200px",
                                }}
                            >
                                Image
                            </div>
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col>
                            <h6>Account Settings</h6>
                        </Col>
                    </Row>
                    <Row
                        className='centerCardCompact'
                        style={{ margin: "0 25px" }}
                    >
                        {valArr.map((item) => (
                            <Col
                                key={item.name}
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                xl={2}
                                className='justify-content-center'
                            >
                                <Card
                                    key={item.name}
                                    bg='light'
                                    text={"dark"}
                                    style={{
                                        minHeight: "300px",
                                        margin: "15px 0",
                                    }}
                                >
                                    <Card.Header>10/12/20</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>{item.name}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            );
        } else {
            return <Redirect to='/' />;
        }
    } else {
        return (
            <div
                style={{
                    height: "1000vh",
                    width: "1000vh",
                    position: "fixed",
                    top: "0",
                    left: "0",
                    zIndex: "100",
                    backgroundColor: "#fff",
                }}
            ></div>
        );
    }
};

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        //authStatus: state.firebase.auth,
        //authError: state.auth.authError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountBoard);
