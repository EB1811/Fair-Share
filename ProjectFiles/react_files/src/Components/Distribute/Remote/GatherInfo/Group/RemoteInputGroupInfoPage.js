import React, { useState, useEffect } from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import ErrorAlertModal from "../../../../Notifications/ErrorAlertModal";
import LoadingScreen from "../../../../LoadingScreen/LoadingScreen";

import {
    useFirestoreConnect,
    isLoaded,
    useFirestore,
} from "react-redux-firebase";
import { useSelector } from "react-redux";

// React Router firebaseUsers: state.firestore.ordered.users
import { withRouter, Redirect, useParams } from "react-router-dom";

const RemoteInputGroupInfoPage = (props) => {
    const firestore = useFirestore();
    useFirestoreConnect([
        { collection: "ShareSessions", doc: props.match.params.sessionID },
        { collection: "users" },
        { collection: "SessionInvitations" },
    ]);

    // Form user email.
    const [userEmail, setUserEmail] = useState("");
    // Is the user on this page in the session group?
    const [thisUserInvited, setThisUserInvited] = useState(true);
    const [userAllowedDetermined, setUserAllowedDetermined] = useState(false);
    // When invitation sent.
    const [inviteSent, setInviteSent] = useState(false);
    // Store error message.
    const [errorMessage, setErrorMessage] = useState("");

    const session = useSelector(
        ({ firestore: { data } }) =>
            data.ShareSessions &&
            data.ShareSessions[props.match.params.sessionID]
    );
    const firebaseUsers = useSelector((state) => state.firestore.ordered.users);
    const invitations = useSelector(
        (state) => state.firestore.ordered.SessionInvitations
    );
    const profile = useSelector((state) => state.firebase.profile);
    const uid = useSelector((state) => state.firebase.auth.uid);

    // To avoid many calls.
    const isSessionLoaded = isLoaded(session);
    const isUsersLoaded = isLoaded(firebaseUsers);

    // For routing to next section.
    let { sessionID } = useParams();

    //* Add the user who is on the page on page load if they are in 'invitedUsers' collection or owner.
    //? Maybe user gets added to the group when they click 'accept' on the push notification?
    useEffect(() => {
        if (!userAllowedDetermined) {
            if (profile.isLoaded && isUsersLoaded && isSessionLoaded) {
                if (session && session.active) {
                    if (session.owner === uid) {
                        // Add owner if they are not yet in the group.
                        // Group doesn't exist if owner isn't in the group yet.
                        if (!session.group) {
                            const group = [];
                            group.push({
                                userEmail: profile.email,
                                username: profile.username,
                            });

                            firestore
                                .update(
                                    {
                                        collection: "ShareSessions",
                                        doc: sessionID,
                                    },
                                    { group: group }
                                )
                                .then(() => {
                                    console.log("Success");
                                    setUserAllowedDetermined(true);
                                })
                                .catch((err) => {
                                    console.log(err.message);
                                });
                        } else {
                            setUserAllowedDetermined(true);
                        }
                    } else if (session.invitedUsers.length > 0) {
                        if (
                            session.invitedUsers.some(
                                (email) => email === profile.email
                            )
                        ) {
                            // User is invited, proceed to add to group.
                            const group = [...session.group];
                            // Make sure this user isn't already in the group.
                            if (
                                !group.some(
                                    (obj) => obj.userEmail === profile.email
                                )
                            ) {
                                console.log("Adding User");
                                group.push({
                                    userEmail: profile.email,
                                    username: profile.username,
                                });
                                // Updates firestore.
                                firestore
                                    .update(
                                        {
                                            collection: "ShareSessions",
                                            doc: sessionID,
                                        },
                                        { group: group }
                                    )
                                    .then(() => {
                                        console.log("Success");
                                        setUserAllowedDetermined(true);
                                    })
                                    .catch((err) => {
                                        console.log(err.message);
                                    });
                            } else {
                                setUserAllowedDetermined(true);
                            }
                        }
                    } else {
                        // No one is invited, don't check if user exist in invited users array.
                        setUserAllowedDetermined(true);
                    }
                } else {
                    setUserAllowedDetermined(true);
                }
            }
        }
    }, [
        profile,
        isSessionLoaded,
        isUsersLoaded,
        userAllowedDetermined,
        thisUserInvited,
        sessionID,
        session,
        uid,
        firestore,
    ]);

    //* Check if user is invited.
    useEffect(() => {
        if (profile.isLoaded && isSessionLoaded) {
            if (session && session.owner !== uid) {
                console.log("Checking Invitation");
                console.log(session.invitedUsers);
                if (session.invitedUsers.length > 0) {
                    if (
                        session.invitedUsers.some(
                            (email) => email === profile.email
                        )
                    ) {
                        // User is invited.
                        setThisUserInvited(true);
                    } else {
                        setThisUserInvited(false);
                    }
                } else {
                    // No one is invited, don't check if user exist in invited users array.
                    setThisUserInvited(false);
                }
            }
        }
    }, [session, isSessionLoaded, profile, uid]);

    // Invite, i.e., add to 'invitedUsers'. Users who are on this session's page must be in invited users array.
    const inviteToGroup = async (e) => {
        e.preventDefault();
        // Find user in 'users' collection.
        const user = firebaseUsers.filter((user) => user.email === userEmail);
        // Make sure user is not self and user exists.
        if (profile.email !== userEmail && user.length > 0) {
            const invitedUsers = session.invitedUsers
                ? [...session.invitedUsers]
                : [];
            // Make sure user isn't already invited.
            if (invitedUsers.some((email) => email === userEmail)) {
                setErrorMessage("Error! Invalid username.");
                setInviteSent(false);
                setUserEmail("");
            } else {
                invitedUsers.push(userEmail);
                // First add to SessionInvitations collection. This allows user to get a notification.
                const inviteInfo = {
                    active: true,
                    ownerUsername: profile.username,
                    type: session.type,
                };
                const userCurInvitations = invitations.find(
                    (element) => element.id === userEmail
                )
                    ? JSON.parse(
                          JSON.stringify(
                              invitations.find(
                                  (element) => element.id === userEmail
                              ).invites
                          )
                      )
                    : {};
                //console.log(userCurInvitations);
                userCurInvitations[sessionID] = inviteInfo;

                firestore
                    .set(
                        {
                            collection: "SessionInvitations",
                            doc: userEmail,
                        },
                        {
                            invites: userCurInvitations,
                        }
                    )
                    .then(() => {
                        firestore
                            .update(
                                { collection: "ShareSessions", doc: sessionID },
                                { invitedUsers: invitedUsers }
                            )
                            .then(() => {
                                setInviteSent(true);
                                setUserEmail("");
                                setErrorMessage("");
                            })
                            .catch((err) => console.log(err.message));
                    })
                    .catch((err) => console.log(err.message));
            }
        } else {
            setErrorMessage("Error! Invalid user.");
            setInviteSent(false);
        }
    };
    // Validate group size then continue to next page.
    //? Maybe make user able to go to next page if owner clicks next. Prevents users staying in valuations page while getting removed form group.
    const checkGroup = () => {
        if (session.group.length < 2) {
            setErrorMessage("Error! Must have at least 2 users.");
            setInviteSent(false);
        } else if (
            // In rent sharing, the number of users and rooms must be equal.
            session.type === "Rent" &&
            session.group.length !== session.goods.length
        ) {
            setErrorMessage("Error! Number of rooms and users must be equal.");
            setInviteSent(false);
        } else {
            setErrorMessage("");
            props.history.push(`/Distribute/Valuations/Remote/${sessionID}`);
        }
    };
    const deleteUser = (userEmail) => {
        if (session.owner === uid) {
            if (userEmail !== profile.email) {
                // Return group without user with userEmail.
                const newGroup = [...session.group].filter((user) => {
                    return user.userEmail !== userEmail;
                });
                // Also update 'invitedUsers'
                const newInvitedUsers = [...session.invitedUsers].filter(
                    (email) => {
                        return email !== userEmail;
                    }
                );
                firestore
                    .update(
                        { collection: "ShareSessions", doc: sessionID },
                        { group: newGroup, invitedUsers: newInvitedUsers }
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

    // Wait for load.
    if (isSessionLoaded && profile.isLoaded && userAllowedDetermined) {
        if (!profile.isEmpty) {
            // Session must exist and be active. User must be the session owner or invited.
            if (
                session &&
                session.active &&
                (thisUserInvited || session.owner === uid)
            ) {
                //? Maybe seperate into smaller components?
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
                                {session.owner === uid ? (
                                    <h5>
                                        Enter a user email to add them to the
                                        group.
                                    </h5>
                                ) : (
                                    <h5>Current Group</h5>
                                )}
                                <div
                                    className='mt-4 py-2'
                                    style={{
                                        borderTop: "1px solid #999999",
                                        borderBottom: "1px solid #999999",
                                    }}
                                >
                                    {session.owner === uid ? (
                                        <Form onSubmit={inviteToGroup}>
                                            <Row className='align-items-center'>
                                                <Col xs={8} sm={9}>
                                                    <Form.Control
                                                        size='sm'
                                                        placeholder={
                                                            "Enter User email"
                                                        }
                                                        value={userEmail}
                                                        type='email'
                                                        onChange={(e) =>
                                                            setUserEmail(
                                                                e.target.value
                                                            )
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
                                    ) : null}
                                    <Row className='justify-content-center contentOverflow mt-3'>
                                        <Col sm='10'>
                                            {/* The following displays a card for each user with a delete button if user is not owner. */}
                                            {session.group
                                                ? session.group.map((user) => (
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
                                                          session.owner ===
                                                              uid ? (
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
                                                  ))
                                                : null}
                                        </Col>
                                    </Row>
                                </div>
                                <div className='mt-4'>
                                    <ErrorAlertModal
                                        errorMessage={errorMessage}
                                    />
                                    {inviteSent ? (
                                        <Alert variant={"success"}>
                                            Invitation Sent
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
                return <Redirect to={`/`} />;
            }
        } else {
            return <Redirect to='/Login' />;
        }
    } else {
        return <LoadingScreen />;
    }
};

export default withRouter(RemoteInputGroupInfoPage);
