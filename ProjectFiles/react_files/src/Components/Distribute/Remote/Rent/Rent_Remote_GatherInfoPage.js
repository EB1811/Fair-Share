import React from "react";

// React Components
import InputRoomsInfo from "../../Local/Rent/InputRoomsInfo";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useFirestoreConnect, isLoaded } from "react-redux-firebase";
import { useSelector } from "react-redux";

import { Redirect, useParams } from "react-router-dom";

const Rent_Remote_GatherInfoPage = (props) => {
    useFirestoreConnect([
        { collection: "ShareSessions", doc: props.match.params.sessionID },
    ]);
    const session = useSelector(
        ({ firestore: { data } }) =>
            data.ShareSessions &&
            data.ShareSessions[props.match.params.sessionID]
    );

    let { sessionID } = useParams();

    // Input group info.
    const next = () => {
        props.history.push(`/Distribute/GroupInfo/Remote/Rent`);
    };

    if (isLoaded(session)) {
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
                            style={{ maxWidth: "510px" }}
                        >
                            <InputRoomsInfo next={next} />
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            return <Redirect to='/Distribute/localremote/Rent' />;
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
export default Rent_Remote_GatherInfoPage;
