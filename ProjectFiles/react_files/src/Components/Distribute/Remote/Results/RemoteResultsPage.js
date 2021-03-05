import React, { useEffect, useState } from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import {
    useFirestoreConnect,
    isLoaded,
    useFirestore,
} from "react-redux-firebase";
import { useSelector } from "react-redux";

// React Router
import { Redirect, useParams } from "react-router-dom";

import { getRentResults } from "../../../../ApiFunctions/getRentResults";

const RemoteResultsPage = (props) => {
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

    // Determine the value of userInSession variable.
    useEffect(() => {
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

    // Session owner fetches data and updates firestore. Everyone else waits for results to update,
    useEffect(() => {
        if (isSessionLoaded && profile.isLoaded) {
            if (!profile.isEmpty && session.owner === uid && !session.results) {
                console.log("here");
                // Get results.
                // First convert valuations in user array into a format compatible with API (see value matrix in /ApiFunctions).
                // Need to first convert to array to store order.
                const fsValuesArray = Object.values(session.values);
                const userCount = session.group.length;
                const goodsCount = session.goods.length;
                var valueMatrix = Array.from(
                    Array(userCount),
                    () => new Array(goodsCount)
                );
                for (var i = 0; i < userCount; i++) {
                    for (var j = 0; j < goodsCount; j++) {
                        valueMatrix[i][j] = fsValuesArray[i].goods[j].Value;
                    }
                }

                // Goods or Rooms route.
                const allocationsArr = [];
                if (goodType === "Rent") {
                    getRentResults(valueMatrix, session.totalCost)
                        .then((allocation) => {
                            console.log(allocation);
                            allocation.map((user) =>
                                allocationsArr.push({
                                    email: fsValuesArray[user.who].email,
                                    username: fsValuesArray[user.who].username,
                                    room:
                                        fsValuesArray[user.who].goods[user.room]
                                            .Good,
                                    price: user.price,
                                })
                            );
                            console.log(allocationsArr);
                        })
                        .catch((err) => {
                            console.log(err.message);
                        });
                } else if (goodType === "Goods") {
                }
            }
        }
    }, [isSessionLoaded, profile, session, uid, goodType]);

    //console.log(stateAllocation);
    return (
        <Container fluid className='divBlockWithContentTertiary min-vh-100'>
            <Row className='justify-content-center align-items-center min-vh-100'>
                <Col
                    xs={10}
                    sm={8}
                    md={7}
                    lg={6}
                    className='centerCardCompact m-3'
                    style={{ maxWidth: "700px" }}
                ></Col>
            </Row>
        </Container>
    );
};

export default RemoteResultsPage;

/*

                            <h4>Results</h4>
                            <Col sm='12 mt-5'>
                                {stateAllocation.map((allocationObject) => (
                                    <p
                                        key={
                                            allocationObject.userEmail
                                                ? allocationObject.userEmail
                                                : allocationObject.username
                                        }
                                    >
                                        {allocationObject.username}:&nbsp;
                                        {allocationObject.alloGoods ? (
                                            allocationObject.alloGoods.map(
                                                (goodIndex) => (
                                                    <span
                                                        key={
                                                            goodsArray[
                                                                goodIndex
                                                            ].Good
                                                        }
                                                    >
                                                        {
                                                            goodsArray[
                                                                goodIndex
                                                            ].Good
                                                        }
                                                        &nbsp;
                                                    </span>
                                                )
                                            )
                                        ) : (
                                            <span>
                                                {
                                                    goodsArray[
                                                        allocationObject.room
                                                    ].Good
                                                }
                                                &nbsp;at $
                                                {allocationObject.price}
                                                &nbsp;
                                            </span>
                                        )}
                                    </p>
                                ))}
                            </Col>
                            <a href='/' style={{ textDecoration: "none" }}>
                                <Button
                                    variant='primary'
                                    size='sm'
                                    className='mt-5'
                                >
                                    <span className='smButtonText'>
                                        Share Again
                                    </span>
                                </Button>
                            </a>
*/
