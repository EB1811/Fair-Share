import React, { useState } from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Redirect } from "react-router-dom";

import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";

const AccountBoard = () => {
    const firebase = useFirebase();

    // Getting from store.
    const profile = useSelector((state) => state.firebase.profile);
    const auth = useSelector((state) => state.firebase.auth);

    const [vEmailSent, setVEmailSent] = useState(false);
    const verify = () => {
        const user = firebase.auth().currentUser;
        user.sendEmailVerification()
            .then(() => {
                console.log("Email Sent");
                setVEmailSent(true);
            })
            .catch((err) => {
                console.log("Error: " + err);
            });
    };

    if (profile.isLoaded && auth.isLoaded) {
        if (profile && !auth.isEmpty) {
            return (
                <Container fluid style={{ height: "100vh" }}>
                    <Row className='align-items-center min-vh-100 justify-content-center divBlockWithContentTertiary'>
                        <Col
                            xs={10}
                            sm={7}
                            md={5}
                            lg={4}
                            xl={3}
                            className='centerCardCompact'
                            style={{ maxWidth: "510px" }}
                        >
                            <Row>
                                <Col>
                                    <h4>{profile.username}</h4>
                                </Col>
                            </Row>
                            <hr />
                            <div className='d-flex textLink'>
                                <span className='text-muted'>
                                    Email:{" "}
                                    <span className='ml-1'>
                                        {profile.email}
                                    </span>
                                </span>
                                <span className='ml-auto'>
                                    <a
                                        href='/'
                                        style={{ cursor: "pointer" }}
                                        className='text-muted'
                                    >
                                        Change
                                    </a>
                                </span>
                            </div>
                            <div className='d-flex textLink'>
                                <span className='text-muted '>
                                    Email Verified:{" "}
                                    <span className='ml-1'>
                                        {auth.emailVerified ? "Yes" : "No"}
                                    </span>
                                </span>
                                {!auth.emailVerified ? (
                                    <button
                                        onClick={() => verify()}
                                        disabled={vEmailSent}
                                        className='ml-auto text-muted btn btn-link textLink'
                                        style={{
                                            padding: "0",
                                            border: "none",
                                        }}
                                    >
                                        {vEmailSent ? "Email Sent" : "Verify"}
                                    </button>
                                ) : null}
                            </div>
                            <div className='d-flex textLink'>
                                <span className='text-muted '>
                                    Username:{" "}
                                    <span className='ml-1'>
                                        {profile.username}
                                    </span>
                                </span>
                                <span className='ml-auto'>
                                    <a
                                        href='/'
                                        style={{ cursor: "pointer" }}
                                        className='text-muted'
                                    >
                                        Change
                                    </a>
                                </span>
                            </div>
                            <div className='d-flex textLink'>
                                <span className='text-muted '>
                                    Password:{" "}
                                    <span className='ml-1'>**********</span>
                                </span>
                                <span className='ml-auto'>
                                    <a
                                        href='/'
                                        style={{ cursor: "pointer" }}
                                        className='text-muted'
                                    >
                                        Change
                                    </a>
                                </span>
                            </div>

                            <div
                                className='d-flex textLinkSmall mt-3'
                                style={{
                                    fontStyle: "italic",
                                }}
                            >
                                <span className='text-muted'>
                                    Account Created:{" "}
                                    <span
                                        style={{
                                            fontStyle: "italic",
                                        }}
                                        className='ml-1'
                                    >
                                        {new Date(
                                            auth.createdAt * 1
                                        ).toLocaleDateString()}
                                    </span>
                                </span>
                            </div>
                            <div
                                className='d-flex textLinkSmall'
                                style={{
                                    fontStyle: "italic",
                                }}
                            >
                                <span className='text-muted'>
                                    Last Logged In:{" "}
                                    <span
                                        style={{
                                            fontStyle: "italic",
                                        }}
                                        className='ml-1'
                                    >
                                        {new Date(
                                            auth.lastLoginAt * 1
                                        ).toLocaleDateString()}
                                    </span>
                                </span>
                            </div>
                            <hr />
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
export default AccountBoard;
