import React, { useState } from "react";

// Bootstrap Components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Redux
import { connect } from "react-redux";

const CreateAccount = (props) => {
    // Auth data.
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

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
                            <span className='smButtonText'>Create Account</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
