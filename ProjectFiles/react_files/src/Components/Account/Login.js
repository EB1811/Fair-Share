import React, { useState } from "react";

// Bootstrap Components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

// Redux
import { connect } from "react-redux";
// rrf
import { useFirebase } from "react-redux-firebase";

const Login = (props) => {
    // Auth data.
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const firebase = useFirebase();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email && pass) {
            firebase
                .login({ email: email, password: pass })
                .then(() => {
                    props.loginSuccess();

                    props.history.push("/");
                })
                .catch((err) => {
                    props.loginError(err);
                });
        }
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
                                type='email'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='pass' className='mb-4'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                onChange={(e) => setPass(e.target.value)}
                            />
                        </Form.Group>
                        {props.authError ? (
                            <Alert variant={"danger"}>
                                <span className='smallInfoText'>
                                    {props.authError}
                                </span>
                            </Alert>
                        ) : (
                            <h5>&nbsp;</h5>
                        )}
                        <Button variant='primary' type='submit' size='sm'>
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
        authError: state.auth.authError,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginError: (error) => {
            dispatch({ type: "LOGIN_FAILED", err: error });
        },
        loginSuccess: () => {
            dispatch({ type: "LOGIN_SUCCESS" });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
