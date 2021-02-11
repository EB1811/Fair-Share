import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

import { Redirect } from "react-router-dom";

import { useFirebase } from "react-redux-firebase";

import { useSelector } from "react-redux";

const CreateAccount = (props) => {
    // Auth data.
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState();
    const firebase = useFirebase();
    // Getting from store.
    const authLoaded = useSelector((state) => state.firebase.auth.isLoaded);
    const authId = useSelector((state) => state.firebase.auth.uid);

    // Creating an error massage from the given Error object.
    const errorMessage = (error) => {
        console.log("Signup Failed: ", error.message);
        setError("Signup Failed: " + error.message);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email && pass) {
            if (username) {
                firebase
                    .createUser(
                        { email: email, password: pass },
                        { username: username, email: email }
                    )
                    .then(() => {
                        props.history.push("/");
                    })
                    .catch((err) => {
                        errorMessage(err);
                    });
            } else {
                setEmail("");
                setUsername("");
                setPass("");
                errorMessage(Error("Username cannot be empty."));
            }
        }
    };

    if (authLoaded) {
        if (!authId) {
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
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </Form.Group>
                                <Form.Group controlId='username'>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type='text'
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                </Form.Group>
                                <Form.Group controlId='pass' className='mb-4'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        value={pass}
                                        onChange={(e) =>
                                            setPass(e.target.value)
                                        }
                                    />
                                </Form.Group>
                                {error ? (
                                    <Alert variant={"danger"}>{error}</Alert>
                                ) : (
                                    <h5>&nbsp;</h5>
                                )}
                                <Button
                                    variant='primary'
                                    type='submit'
                                    size='sm'
                                >
                                    <span className='smButtonText'>
                                        Create Account
                                    </span>
                                </Button>
                            </Form>
                        </Col>
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

export default CreateAccount;
