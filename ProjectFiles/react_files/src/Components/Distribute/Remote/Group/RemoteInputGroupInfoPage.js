import React, { useState, useEffect } from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import {
    useFirestoreConnect,
    isLoaded,
    useFirestore,
} from "react-redux-firebase";
import { useSelector } from "react-redux";

// React Router firebaseUsers: state.firestore.ordered.users
import { withRouter, Redirect, useParams } from "react-router-dom";

//TODO: [A301212-100] Currently user joins by going in the url. Implement a push notification when user is invited.
const RemoteInputGroupInfoPage = (props) => {
    const firestore = useFirestore();
    useFirestoreConnect([
        { collection: "ShareSessions", doc: props.match.params.sessionID },
        { collection: "users" },
    ]);
    const session = useSelector(
        ({ firestore: { data } }) =>
            data.ShareSessions &&
            data.ShareSessions[props.match.params.sessionID]
    );
    const firebaseUsers = useSelector((state) => state.firestore.ordered.users);
    const profile = useSelector((state) => state.firebase.profile);
    const uid = useSelector((state) => state.firebase.auth.uid);
    const isSessionLoaded = isLoaded(session);
    const isUsersLoaded = isLoaded(firebaseUsers);

    // For routing to next section.
    let { sessionID, goodType } = useParams();

    // Form user email.
    const [userEmail, setUserEmail] = useState("");
    // Failed bool for conditional rendering failure state.
    const [userIdFailed, setUserIdFailed] = useState(false);
    const [groupCountFailed, setGroupCountFailed] = useState(false);
    const [thisUserAdded, setThisUserAdded] = useState(false);

    // Add the user who is on the page on page load.
    useEffect(() => {
        if (!thisUserAdded) {
            if (profile.isLoaded && isUsersLoaded && isSessionLoaded) {
                const group = session.group ? [...session.group] : [];
                // Make sure this user isn't already in the group.
                if (!group.some((obj) => obj.userEmail === profile.email)) {
                    console.log("Adding User");
                    group.push({
                        userEmail: profile.email,
                        username: profile.username,
                    });
                    // Updates firestore.
                    firestore
                        .update(
                            { collection: "ShareSessions", doc: sessionID },
                            { group: group }
                        )
                        .then(() => {
                            console.log("Success");
                            setThisUserAdded(true);
                        })
                        .catch((err) => {
                            console.log(err.message);
                        });
                } else {
                    setThisUserAdded(true);
                }
            }
        }
    }, [
        profile,
        isSessionLoaded,
        isUsersLoaded,
        thisUserAdded,
        sessionID,
        session,
        firestore,
    ]);

    // Firestore interaction.
    const addToFireStoreGroup = async (email, username) => {
        if (isLoaded(session)) {
            // Copies group and pushes new user object.
            const group = session.group ? [...session.group] : [];
            if (!group.some((obj) => obj.userEmail === email)) {
                console.log("Adding User");
                group.push({
                    userEmail: email,
                    username: username,
                });
                // Updates firestore.
                firestore
                    .update(
                        { collection: "ShareSessions", doc: sessionID },
                        { group: group }
                    )
                    .then(() => {
                        return Promise.resolve();
                    })
                    .catch((err) => {
                        return Promise.reject();
                    });
            }
        }
    };
    // Update number of users on submit.
    const addToGroup = async (e) => {
        e.preventDefault();
        const user = firebaseUsers.filter((user) => user.email === userEmail);
        // Input validation.
        if (
            firebaseUsers &&
            !session.group.some((obj) => obj.userEmail === userEmail) &&
            user.length > 0
        ) {
            await addToFireStoreGroup(
                user[0].email,
                user[0].username
            ).catch((err) => console.log(err.message));

            setUserEmail("");
            setUserIdFailed(false);
        } else {
            setUserIdFailed(true);
            setUserEmail("");
        }
    };
    // Validate group size then continue to next page.
    const checkGroup = () => {
        if (session.group.length < 2) {
            setGroupCountFailed(true);
        } else {
            setGroupCountFailed(false);
            props.history.push(
                `/Distribute/Valuations/Remote/${sessionID}/${goodType}`
            );
        }
    };
    const deleteUser = (userEmail) => {
        if (session.owner === uid) {
            if (userEmail !== profile.email) {
                // Return group without user with userEmail.
                const newGroup = [...session.group].filter((user) => {
                    return user.userEmail !== userEmail;
                });
                firestore
                    .update(
                        { collection: "ShareSessions", doc: sessionID },
                        { group: newGroup }
                    )
                    .then(() => {
                        console.log("User Successfully Deleted.");
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            }
        }
    };

    //TODO: [A301212-96] Different renders based on if the person is owner or not.
    if (isSessionLoaded && profile.isLoaded) {
        if (!profile.isEmpty) {
            if (session && session.active) {
                return (
                    <Container
                        fluid
                        className='divBlockWithContentTertiary min-vh-100'
                    >
                        <Row className='justify-content-center align-items-center min-vh-100'>
                            <Col
                                xs={10}
                                sm={8}
                                md={6}
                                lg={5}
                                xl={3}
                                className='centerCardCompact m-3'
                                style={{ maxWidth: "650px" }}
                            >
                                <h5>
                                    Enter a user email to add them to the group.
                                </h5>
                                <div
                                    className='mt-4 py-2'
                                    style={{
                                        borderTop: "1px solid #999999",
                                        borderBottom: "1px solid #999999",
                                    }}
                                >
                                    <Form onSubmit={addToGroup}>
                                        <Row className='align-items-center'>
                                            <Col xs={8} sm={9}>
                                                <Form.Control
                                                    size='sm'
                                                    placeholder={
                                                        userIdFailed
                                                            ? "Invalid User"
                                                            : "Enter User email"
                                                    }
                                                    value={userEmail}
                                                    type='email'
                                                    onChange={(e) =>
                                                        setUserEmail(
                                                            e.target.value
                                                        )
                                                    }
                                                    style={
                                                        userIdFailed
                                                            ? {
                                                                  border:
                                                                      "1px solid red",
                                                              }
                                                            : {}
                                                    }
                                                />
                                            </Col>
                                            <Col xs={4} sm={3}>
                                                <Button
                                                    variant='primary'
                                                    size='md'
                                                    type='submit'
                                                >
                                                    <span>Add</span>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                    <Row className='justify-content-center contentOverflow mt-3'>
                                        <Col sm='10'>
                                            {/*//? Maybe split into own component.*/}
                                            {/* The following displays a card for each user with a delete button if user is not owner. */}
                                            {session.group.map((user) => (
                                                <Card
                                                    style={{
                                                        color: "#000",
                                                        textAlign: "left",
                                                    }}
                                                    key={user.userEmail}
                                                    body
                                                >
                                                    {user.username}
                                                    {user.userEmail !==
                                                        profile.email &&
                                                    session.owner === uid ? (
                                                        <button
                                                            className='close'
                                                            onClick={() =>
                                                                deleteUser(
                                                                    user.userEmail
                                                                )
                                                            }
                                                        >
                                                            ×
                                                        </button>
                                                    ) : (
                                                        <button className='close'></button>
                                                    )}
                                                </Card>
                                            ))}
                                        </Col>
                                    </Row>
                                </div>
                                <div className='mt-4'>
                                    {groupCountFailed ? (
                                        <Alert variant={"danger"}>
                                            Error! Must have at least 2 users.
                                        </Alert>
                                    ) : null}
                                    <Button
                                        variant='primary'
                                        size='sm'
                                        onClick={checkGroup}
                                    >
                                        <span className='smButtonText'>
                                            Next
                                        </span>
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                );
            } else {
                return (
                    <Redirect
                        to={`/Distribute/Valuations/Remote/${sessionID}/${goodType}`}
                    />
                );
            }
        } else {
            return <Redirect to='/Login' />;
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

export default withRouter(RemoteInputGroupInfoPage);
