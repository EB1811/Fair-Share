import React from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { useFirestoreConnect, isLoaded } from "react-redux-firebase";

// React Router
import { useParams, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

// Answers saved to firestore doc with session id = parameter session id.
const Remote_RentQuestionnairePage = (props) => {
    useFirestoreConnect([
        { collection: "ShareSessions", doc: props.match.params.sessionID },
    ]);
    const session = useSelector(
        ({ firestore: { data } }) =>
            data.ShareSessions &&
            data.ShareSessions[props.match.params.sessionID]
    );

    // Stage = question. From URl.
    let { stage } = useParams();

    // Check if doc with id sessionID exists in the firestore ShareSessions table exists.
    /*
    const [loading, setLoading] = useState(true);
    const [sessionExists, setSessionExists] = useState();

    useEffect(() => {
        firestore
            .get({ collection: "ShareSessions", doc: sessionID })
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    if (docSnapshot.get("active")) {
                        setSessionExists(true);
                        setLoading(false);
                    } else {
                        setSessionExists(false);
                        setLoading(false);
                    }
                } else {
                    setSessionExists(false);
                    setLoading(false);
                }
            });
    }, [sessionID, firestore]);
    */

    if (isLoaded(session)) {
        if (session && session.active) {
            if (stage === "0") {
                return (
                    <Container
                        fluid
                        className='divBlockWithContentTertiary min-vh-100'
                    >
                        <Row className='justify-content-center align-items-center min-vh-100'>
                            <Col
                                xs={10}
                                sm={7}
                                md={5}
                                lg={4}
                                xl={3}
                                className='centerCard m-3'
                                style={{ maxWidth: "510px" }}
                            >
                                <h6>
                                    Please complete the following short
                                    questionnaire.
                                    <br />
                                    <br />
                                    Answers to these questions will determine
                                    what qualities the allocation algorithm will
                                    have.
                                </h6>
                                <Button
                                    variant='primary'
                                    size='sm'
                                    className='mt-5'
                                    onClick={() =>
                                        props.history.push(
                                            "/Distribute/Rent/Questions/1"
                                        )
                                    }
                                >
                                    <span className='smButtonText'>Begin</span>
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                );
            } else if (stage > 1) {
                return <Redirect to='/Distribute/Rent/GoodInfo' />;
            } else {
                return <Redirect to='/Distribute/Rent/Questions/0' />;
            }
        } else {
            return <Redirect to='/Distribute/localremote/Rent' />;
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

export default Remote_RentQuestionnairePage;
