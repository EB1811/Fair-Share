import React, { useState, useEffect } from "react";

// React Router
import { withRouter, Redirect, useParams } from "react-router-dom";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import LoadingScreen from "../../../LoadingScreen/LoadingScreen";

import {
    useFirestoreConnect,
    isLoaded,
    useFirestore,
} from "react-redux-firebase";
import { useSelector } from "react-redux";

// React Components
import RemoteInputValuations from "./RemoteInputValuations";

const Remote_SetValuationsPage = (props) => {
    // True if user in session group.
    const [userInSession, setUserInSession] = useState(false);
    const [userInSessionDetermined, setUserInSessionDetermined] = useState();
    // For rendering 'waiting' page.
    const [editValues, setEditValues] = useState(false);

    const firestore = useFirestore();
    useFirestoreConnect([
        { collection: "ShareSessions", doc: props.match.params.sessionID },
    ]);
    const session = useSelector(
        ({ firestore: { data } }) =>
            data.ShareSessions &&
            data.ShareSessions[props.match.params.sessionID]
    );
    const profile = useSelector((state) => state.firebase.profile);
    const uid = useSelector((state) => state.firebase.auth.uid);
    const isSessionLoaded = isLoaded(session);

    let { sessionID } = useParams();

    // Determine the value of userInSession variable.
    useEffect(() => {
        if (isSessionLoaded && profile.isLoaded && !userInSessionDetermined) {
            if (session && !profile.isEmpty) {
                if (
                    session.group.some(
                        (user) =>
                            user.userEmail === profile.email &&
                            user.username === profile.username
                    )
                ) {
                    setUserInSession(true);
                    setUserInSessionDetermined(true);
                } else {
                    setUserInSession(false);
                    setUserInSessionDetermined(true);
                }
            } else {
                setUserInSession(false);
                setUserInSessionDetermined(true);
            }
        }
    }, [
        isSessionLoaded,
        profile,
        session,
        userInSession,
        setUserInSession,
        userInSessionDetermined,
        setUserInSessionDetermined,
    ]);

    // Create {userEmail?, username, userGoodsArr} and add to firestore valuations array.
    const storeValuations = (userGoodsArray, total) => {
        // Algorithms expect valuations total value > total cost.
        const values = session.values
            ? JSON.parse(JSON.stringify(session.values))
            : {};
        const userValues = {
            username: profile.username,
            email: profile.email,
            goods: userGoodsArray,
        };
        // Add or replace for each good.
        /*
            userGoodsArray.forEach((good) => {
                userValues[good.Good] = parseInt(good.Value);
            });
            */
        values[uid] = userValues;

        firestore
            .update(
                { collection: "ShareSessions", doc: sessionID },
                { values: values }
            )
            .then(() => {
                console.log("Successfully added your values");

                setEditValues(false);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    // Wait for load.
    if (isSessionLoaded && profile.isLoaded && userInSessionDetermined) {
        // Must be logged in.
        if (!profile.isEmpty) {
            // Session must exist and be active, and userInSession must be true.
            if (session && session.active && userInSession) {
                // Check if session contains goods to share.
                if (!session.goods) {
                    return (
                        <Redirect
                            to={`/Distribute/GoodInfo/Remote/${sessionID}`}
                        />
                    );
                }
                // Check if session contains a correctly sized group.
                else if (!session.group || session.group.length < 2) {
                    return (
                        <Redirect
                            to={`/Distribute/GroupInfo/Remote/${sessionID}`}
                        />
                    );
                } else {
                    // If user has submitted their values.
                    if (session.values && session.values[uid] && !editValues) {
                        // If everyone is finished.
                        if (
                            Object.keys(session.values).length ===
                            session.group.length
                        ) {
                            return (
                                <Redirect
                                    to={`/Distribute/Results/Remote/${sessionID}`}
                                />
                            );
                        } else {
                            return (
                                <Container
                                    fluid
                                    className='divBlockWithContentTertiary min-vh-100'
                                >
                                    <Row className='justify-content-center align-items-center min-vh-100'>
                                        <Col
                                            xs={10}
                                            sm={8}
                                            md={7}
                                            lg={6}
                                            className='centerCardCompact m-3'
                                            style={{ maxWidth: "800px" }}
                                        >
                                            <h4>
                                                Waiting for other players to
                                                submit their valuations.
                                            </h4>
                                            {/*  
                                        //! Not shown if someone is editing. User could be redirected while editing.
                                        //TODO Add the following when fixed.
                                        <Button
                                            variant='primary'
                                            size='md'
                                            onClick={() => setEditValues(true)}
                                        >
                                            <span>Edit</span>
                                        </Button>
                                        */}
                                        </Col>
                                    </Row>
                                </Container>
                            );
                        }
                    } else
                        return (
                            <Container
                                fluid
                                className='divBlockWithContentTertiary min-vh-100'
                            >
                                <Row className='justify-content-center align-items-center min-vh-100'>
                                    <Col
                                        xs={10}
                                        sm={8}
                                        md={7}
                                        lg={6}
                                        className='centerCardCompact m-3'
                                        style={{ maxWidth: "800px" }}
                                    >
                                        <h4>
                                            {profile.username}: Enter your
                                            valuation for each item:
                                        </h4>
                                        <RemoteInputValuations
                                            goods={
                                                session.values &&
                                                session.values[uid]
                                                    ? [
                                                          ...session.values[uid]
                                                              .goods,
                                                      ]
                                                    : session.goods
                                            }
                                            totalCost={session.totalCost}
                                            storeValuations={storeValuations}
                                            goodType={session.type}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        );
                }
            } else {
                console.log(userInSession);
                console.log(session);
                console.log(userInSessionDetermined);
                return <Redirect to={`/`} />;
            }
        } else {
            return <Redirect to='/Login' />;
        }
    } else {
        return <LoadingScreen />;
    }
};

export default withRouter(Remote_SetValuationsPage);
