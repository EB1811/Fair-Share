import React, { useState, useEffect } from "react";

// Bootstrap Components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Redux
import { connect } from "react-redux";

const Login = (props) => {
    // Auth data.
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Origin: "http://localhost:3000",
            },
            body: JSON.stringify({
                valueMatrix: [
                    [1, 1, 0],
                    [1, 1, 1],
                    [1, 0, 0],
                ],
            }),
        };
        fetch("https://localhost:5001/api/getAllocation", requestOptions)
            .then((res) => res.json())
            .then((data) => console.log(data));
    }, []);

    return (
        <Container fluid style={{ height: "100vh" }}>
            <Row className='align-items-center min-vh-100 justify-content-center divBlockWithContentTertiary'>
                <Col
                    xs={10}
                    sm={7}
                    md={5}
                    lg={4}
                    xl={3}
                    className='centerCard'
                    style={{ maxWidth: "510px" }}
                >
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='text'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='pass'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='text'
                                onChange={(e) => setPass(e.target.value)}
                            />
                        </Form.Group>
                        <Button
                            variant='primary'
                            type='submit'
                            size='sm'
                            className='mt-5'
                        >
                            <span className='smButtonText'>Login</span>
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = (state) => {
    ////console.log(state)
    return {
        ////authStatus: state.firebase.auth,
        ////authError: state.auth.authError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
