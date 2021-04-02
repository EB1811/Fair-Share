import React from "react";

// React Components
import InputMoneyInfo from "../../../Local/Divorce/InputMoneyInfo";

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

import { Redirect, useParams } from "react-router-dom";

const RemoteDivorce_GatherMoneyInfoPage = (props) => {
    const firestore = useFirestore();
    useFirestoreConnect([
        { collection: "ShareSessions", doc: props.match.params.sessionID },
    ]);
    const session = useSelector(
        ({ firestore: { data } }) =>
            data.ShareSessions &&
            data.ShareSessions[props.match.params.sessionID]
    );
    const auth = useSelector((state) => state.firebase.auth);
    let { sessionID } = useParams();

    const next = (moneyAmount) => {
        if (moneyAmount >= 0) {
            firestore
                .update(
                    { collection: "ShareSessions", doc: sessionID },
                    { moneyAmount: parseInt(moneyAmount) }
                )
                .then(() => {
                    props.history.push(
                        `/Distribute/GroupInfo/Remote/${sessionID}/Divorce`
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    if (isLoaded(session) && auth.isLoaded) {
        if (!auth.isEmpty) {
            if (session && session.active && session.owner === auth.uid) {
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
                                style={{ maxWidth: "510px" }}
                            >
                                <InputMoneyInfo next={next} session={session} />
                            </Col>
                        </Row>
                    </Container>
                );
            } else {
                return <Redirect to='/Distribute/localremote/Divorce' />;
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

export default RemoteDivorce_GatherMoneyInfoPage;
