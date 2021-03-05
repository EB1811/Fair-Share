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
        // Determine the value of userInSession.
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

    const storeValuations = (userGoodsArray) => {};

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
                                md={7}
                                lg={6}
                                className='centerCardCompact m-3'
                                style={{ maxWidth: "800px" }}
                            >
                                <h4>
                                    {profile.username}: Enter your valuation for
                                    each item:
                                </h4>
                                <RemoteInputValuations
                                    goods={[...session.goods]}
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
