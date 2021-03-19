import React, { useEffect, useState } from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Redirect } from "react-router-dom";

import { useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";

import ChangeEmailForm from "./AccountActions/ChangeEmailForm";
import ChangeUsernameForm from "./AccountActions/ChangeUsernameForm";
import ChangePasswordForm from "./AccountActions/ChangePasswordForm";
import AccountBoardPastSessionDisplay from "./AccountBoardPastSessionDisplay";

const AccountBoard = () => {
    const firebase = useFirebase();
    const firestore = useFirestore();

    // Getting from store.
    const profile = useSelector((state) => state.firebase.profile);
    const auth = useSelector((state) => state.firebase.auth);

    // Message could be set in input components.
    const [errorMessage, setErrorMessage] = useState("");

    // Show input components when true.
    const [emailChange, setEmailChange] = useState(false);
    const [usernameChange, setUsernameChange] = useState(false);
    const [passChange, setPassChange] = useState(false);

    // List of session where this user was in.
    const [pastSessions, setPastSessions] = useState();

    // Get past share sessions this user was in.
    useEffect(() => {
        if (profile.isLoaded && !pastSessions) {
            const userInfo = {
                userEmail: profile.email,
                username: profile.username,
            };
            firestore
                .get({
                    collection: "ShareSessions",
                    where: [
                        ["active", "==", false],
                        ["group", "array-contains", userInfo],
                    ],
                })
                .then((docSnap) => {
                    // Convert results to array containing the session objects.
                    const tempArr = [];
                    docSnap.docs.forEach((result) => {
                        tempArr.push({ id: result.id, data: result.data() });
                    });
                    setPastSessions(tempArr);
                    console.log("Successfully retrieved past share sessions");
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    }, [firestore, pastSessions, profile]);

    // Show 'email sent' display if true.
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

    // Variable used for confirmation. Set true after 1 click -> display button to trigger function if true.
    //TODO: [A301212-114] Delete user in 'ShareInvatations'.
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

    //? Maybe split past sessions into seperate page.
    if (profile.isLoaded && auth.isLoaded && pastSessions) {
        if (profile && !auth.isEmpty) {
            return (
                <Container fluid className='min-vh-100'>
                    <Row className='align-items-center min-vh-100 justify-content-center divBlockWithContentTertiary'>
                        <Col
                            xs={10}
                            sm={7}
                            md={5}
                            lg={4}
                            xl={3}
                            className='centerCardCompact my-3'
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
                                            <ChangeEmailForm
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
                                            <ChangeUsernameForm
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
                                            <ChangePasswordForm
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
                            {!pastSessions ? (
                                <h5>No Past Share Sessions</h5>
                            ) : (
                                <div>
                                    <h5 className='mb-4'>
                                        Past Share Sessions
                                    </h5>
                                    {pastSessions.map((session) => (
                                        <AccountBoardPastSessionDisplay
                                            key={session.id}
                                            session={session.data}
                                            uid={auth.uid}
                                        />
                                    ))}
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            return <Redirect to='/' />;
        }
    } else {
        // Loading screen.
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
