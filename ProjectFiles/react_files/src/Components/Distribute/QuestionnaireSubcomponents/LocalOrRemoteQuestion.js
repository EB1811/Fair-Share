import React from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import Button from "react-bootstrap/Button";

import { withRouter, useParams, Redirect } from "react-router";
import { useFirestore } from "react-redux-firebase";

import { useDispatch, useSelector } from "react-redux";
import questionnaireActions from "../../../ReduxStore/Actions/questionnaireActions";

import shareLocal from "../../../Images/meeting-local-group_ICON.svg";
import shareOnlineGroup from "../../../Images/share-online-group_ICON.svg";

const LocalOrRemoteQuestion = (props) => {
    let { goodType } = useParams();
    const firestore = useFirestore();

    const auth = useSelector((state) => state.firebase.auth);
    const dispatch = useDispatch();

    // Set the group info gathering method (local or remote) then go to next question page. User must be logged in to use the remote option.
    const setMethod = (method) => {
        dispatch(questionnaireActions.setShareMethod(method));

        if (method === "remote" && auth.isEmpty) {
            props.history.push("/login");
        }
        if (method === "remote") {
            // Setup session info and add to firestore.
            firestore
                .add(
                    { collection: "ShareSessions" },
                    {
                        owner: auth.uid,
                        type: goodType,
                        active: true,
                    }
                )
                .then((docSnapshot) => {
                    props.history.push(
                        `/Distribute/Questions/Remote/${goodType}/${docSnapshot.id}/0`
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            props.history.push(`/Distribute/Questions/Local/${goodType}/0`);
        }
    };

    if ((goodType === "Rent") | (goodType === "Goods")) {
        return (
            <Container fluid className='divBlockWithContentTertiary min-vh-100'>
                <Row className='justify-content-center align-items-center min-vh-100'>
                    <Col
                        xs={11}
                        sm={11}
                        md={10}
                        lg={7}
                        xl={5}
                        className='centerCard m-3'
                        style={{ maxWidth: "800px" }}
                    >
                        <Row>
                            <Col xs={12} sm={6} className='my-2'>
                                <img
                                    src={shareLocal}
                                    className='SVGButton'
                                    alt='meeting-local-group_ICON'
                                    onClick={() => setMethod("local")}
                                />
                                <p
                                    className='mt-3 text-muted'
                                    style={{ fontSize: "0.9rem" }}
                                >
                                    Share locally, passing your device around to
                                    gather everyone's valuations. No login
                                    needed.
                                </p>
                            </Col>
                            <Col xs={12} sm={6} className='my-2'>
                                <img
                                    src={shareOnlineGroup}
                                    className='SVGButton'
                                    alt='share-online-group_ICON.svg'
                                    onClick={() => setMethod("remote")}
                                />
                                <p
                                    className='mt-3 text-muted'
                                    style={{ fontSize: "0.9rem" }}
                                >
                                    Share using an online group, having members
                                    login and get invited to your party.
                                </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    } else {
        return <Redirect to='/' />;
    }
};

export default withRouter(LocalOrRemoteQuestion);
