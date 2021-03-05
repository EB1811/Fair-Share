import React, { useState, useEffect } from "react";

// React Router
import { withRouter, Redirect, useParams } from "react-router-dom";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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

    let { sessionID, goodType } = useParams();

    useEffect(() => {
        // Determine the value of userInSession variable.
        if (isSessionLoaded && profile.isLoaded && !userInSessionDetermined) {
            if (!profile.isEmpty) {
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
        //TODO: [A301212-97] Render error message when total value > total cost is false.
        if (total >= session.totalCost) {
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
        }
    };

    if (isSessionLoaded && profile.isLoaded) {
        if (!profile.isEmpty) {
            if (session && session.active) {
                if (session.values && session.values[uid] && !editValues) {
                    if (
                        Object.keys(session.values).length ===
                        session.group.length
                    ) {
                        return <Redirect to='/' />;
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
                                            Waiting for other players to submit
                                            their valuations.
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
                                        {profile.username}: Enter your valuation
                                        for each item:
                                    </h4>
                                    <RemoteInputValuations
                                        goods={
                                            session.values &&
                                            session.values[uid]
                                                ? [...session.values[uid].goods]
                                                : session.goods
                                        }
                                        totalCost={session.totalCost}
                                        storeValuations={storeValuations}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    );
            } else {
                return <Redirect to={`/Distribute/localremote/${goodType}`} />;
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

export default withRouter(Remote_SetValuationsPage);
