import React from "react";

// React Components
import RemoteInputGoodsInfo from "./InputForms/RemoteInputGoodsInfo";
import InputRoomsInfo from "../../../Local/Rent/InputRoomsInfo";
import LoadingScreen from "../../../../LoadingScreen/LoadingScreen";

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

const RemoteGatherGoodsPage = (props) => {
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

    // Continue to input group info or in the case of divorce type, money info.
    const nextG = () => {
        if (session.type === "Divorce") {
            props.history.push(`/Distribute/GoodInfo/Remote/${sessionID}/2`);
        } else {
            props.history.push(`/Distribute/GroupInfo/Remote/${sessionID}`);
        }
    };

    // In case of rent process, goods needs to be added into firestore.
    const nextR = (roomCount, totalCost) => {
        var goods = [];
        for (var i = 0; i < roomCount; i++) {
            var room = { Good: "Room " + (parseInt(i) + 1), Value: 0 };
            goods.push(room);
        }

        if (totalCost > 0 && roomCount > 0) {
            firestore
                .update(
                    { collection: "ShareSessions", doc: sessionID },
                    { totalCost: parseInt(totalCost), goods: goods }
                )
                .then(() => {
                    console.log(session);
                    props.history.push(
                        `/Distribute/GroupInfo/Remote/${sessionID}`
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    // Wait for load.
    if (isLoaded(session) && auth.isLoaded) {
        // Must be logged in.
        if (!auth.isEmpty) {
            // Session must exist and be active. Only the owner can be on the page.
            if (session && session.active && session.owner === auth.uid) {
                // Render based on which good type.
                switch (session.type) {
                    // Both divorce and goods cases return the RemoteInputGoodsInfo component.
                    case "Goods":
                    case "Divorce":
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
                                        <RemoteInputGoodsInfo
                                            next={nextG}
                                            session={session}
                                            sessionID={sessionID}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        );
                    case "Rent":
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
                                        <InputRoomsInfo
                                            next={nextR}
                                            session={session}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        );
                    default:
                        return <Redirect to='/' />;
                }
            } else {
                return <Redirect to='/' />;
            }
        } else {
            return <Redirect to='/Login' />;
        }
    } else {
        // Loading.
        return <LoadingScreen />;
    }
};
export default RemoteGatherGoodsPage;
