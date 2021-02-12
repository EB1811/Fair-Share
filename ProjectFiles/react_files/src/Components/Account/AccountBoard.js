import React, { useState } from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { Redirect } from "react-router-dom";

import { useSelector } from "react-redux";

const AccountBoard = () => {
    //! Temp data. Change once server is set up.
    const [valArr] = useState([
        { name: "Valuation 1" },
        { name: "Valuation 2" },
        { name: "Valuation 3" },
        { name: "Valuation 4" },
    ]);
    // Getting from store.
    const profile = useSelector((state) => state.firebase.profile);
    const auth = useSelector((state) => state.firebase.auth);

    if (profile.isLoaded && auth.isLoaded) {
        if (profile && auth) {
            console.log(auth);
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
                                    <span className='ml-auto'>
                                        <a
                                            href='/'
                                            style={{ cursor: "pointer" }}
                                            className='text-muted'
                                        >
                                            Verify
                                        </a>
                                    </span>
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
