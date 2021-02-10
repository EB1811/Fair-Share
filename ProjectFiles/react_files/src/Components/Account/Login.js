import React, { useState } from "react";

// Bootstrap Components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

// rrf
import { useFirebase } from "react-redux-firebase";

const Login = (props) => {
    // Auth data.
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState();
    const firebase = useFirebase();

    // Creating an error massage from the given Error object.
    const errorMessage = (error) => {
        console.log("Login Failed: ", error.message);
        setError("Login Failed: " + error.message);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email && pass) {
            firebase
                .login({ email: email, password: pass })
                .then(() => {
                    props.history.push("/");
                })
                .catch((err) => {
                    setEmail("");
                    setPass("");
                    errorMessage(err);
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='pass' className='mb-4'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                            />
                        </Form.Group>
                        {error ? (
                            <Alert variant={"danger"}>{error}</Alert>
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

export default Login;
