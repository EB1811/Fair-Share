import React, { useState } from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Redirect } from "react-router-dom";

import { useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";

import SmallChangeEmailForm from "./AccountActions/SmallChangeEmailForm";
import SmallChangeUsernameForm from "./AccountActions/SmallChangeUsernameForm";
import SmallChangePasswordForm from "./AccountActions/SmallChangePasswordForm";

const AccountBoard = () => {
    const firebase = useFirebase();
    const firestore = useFirestore();

    // Getting from store.
    const profile = useSelector((state) => state.firebase.profile);
    const auth = useSelector((state) => state.firebase.auth);
    const [errorMessage, setErrorMessage] = useState("");

    // Change render.
    const [emailChange, setEmailChange] = useState(false);
    const [usernameChange, setUsernameChange] = useState(false);
    const [passChange, setPassChange] = useState(false);

    // Verify email.
    const [vEmailSent, setVEmailSent] = useState(false);
    const verify = () => {
        const user = firebase.auth().currentUser;
        user.sendEmailVerification()
            .then(() => {
                console.log("Email Sent");
                setVEmailSent(true);
            })
            .catch((err) => {
                console.log("Error: " + err.message);
                setErrorMessage(err.message);
            });
    };

    // Delete account.
    const [delAccountSelected, setDelAccountSelected] = useState(false);
    const deleteAccount = () => {
        const uid = auth.uid;
        const user = firebase.auth().currentUser;
        //! BUG: [A301212-88] If delete() fails, user info in firestore is still deleted. Can solve with a dedicated reauthenticate.
        firestore.delete({
            collection: "users",
            doc: uid,
        });
        user.delete()
            .then(() => {
                console.log("Account Deleted");
            })
            .catch((err) => {
                console.log("Error: " + err.message);
                setErrorMessage(err.message);
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
                                        {emailChange ? (
                                            <SmallChangeEmailForm
                                                setEmailChange={setEmailChange}
                                                setErrorMessage={
                                                    setErrorMessage
                                                }
                                            />
                                        ) : (
                                            profile.email
                                        )}
                                    </span>
                                </span>
                                <span className='ml-auto'>
                                    {!emailChange ? (
                                        <button
                                            onClick={() => setEmailChange(true)}
                                            disabled={emailChange}
                                            className='ml-auto text-muted btn btn-link textLink'
                                            style={{
                                                padding: "0",
                                                border: "none",
                                            }}
                                        >
                                            Change
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                setEmailChange(false)
                                            }
                                            className='ml-auto text-muted btn btn-link textLink'
                                            style={{
                                                padding: "0",
                                                border: "none",
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    )}
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
                                        {usernameChange ? (
                                            <SmallChangeUsernameForm
                                                setUsernameChange={
                                                    setUsernameChange
                                                }
                                                setErrorMessage={
                                                    setErrorMessage
                                                }
                                            />
                                        ) : (
                                            profile.username
                                        )}
                                    </span>
                                </span>
                                <span className='ml-auto'>
                                    {!usernameChange ? (
                                        <button
                                            onClick={() =>
                                                setUsernameChange(true)
                                            }
                                            className='ml-auto text-muted btn btn-link textLink'
                                            style={{
                                                padding: "0",
                                                border: "none",
                                            }}
                                        >
                                            Change
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                setUsernameChange(false)
                                            }
                                            className='ml-auto text-muted btn btn-link textLink'
                                            style={{
                                                padding: "0",
                                                border: "none",
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </span>
                            </div>
                            <div className='d-flex textLink'>
                                <span className='text-muted '>
                                    Password:{" "}
                                    <span className='ml-1'>
                                        {passChange ? (
                                            <SmallChangePasswordForm
                                                setPassChange={setPassChange}
                                                setErrorMessage={
                                                    setErrorMessage
                                                }
                                            />
                                        ) : (
                                            "**********"
                                        )}
                                    </span>
                                </span>
                                <span className='ml-auto'>
                                    {!passChange ? (
                                        <button
                                            onClick={() => setPassChange(true)}
                                            className='ml-auto text-muted btn btn-link textLink'
                                            style={{
                                                padding: "0",
                                                border: "none",
                                            }}
                                        >
                                            Change
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setPassChange(false)}
                                            className='ml-auto text-muted btn btn-link textLink'
                                            style={{
                                                padding: "0",
                                                border: "none",
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    )}
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
                            <div
                                className='d-flex mt-2'
                                style={{
                                    fontStyle: "italic",
                                }}
                            >
                                <span className='text-muted'>
                                    {delAccountSelected ? (
                                        <button
                                            onClick={() => deleteAccount()}
                                            className='ml-auto text-muted btn btn-link textLinkSmall'
                                            style={{
                                                padding: "0",
                                                border: "none",
                                            }}
                                        >
                                            Click to confirm
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                setDelAccountSelected(true)
                                            }
                                            className='ml-auto text-muted btn btn-link textLinkSmall'
                                            style={{
                                                fontStyle: "italic",
                                                padding: "0",
                                                border: "none",
                                            }}
                                        >
                                            Delete Account
                                        </button>
                                    )}
                                </span>
                            </div>
                            {errorMessage ? (
                                <div
                                    className='d-flex textLink mt-2'
                                    style={{
                                        fontStyle: "italic",
                                    }}
                                >
                                    <span
                                        style={{
                                            color: "red",
                                        }}
                                    >
                                        {errorMessage}
                                    </span>
                                </div>
                            ) : null}
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
