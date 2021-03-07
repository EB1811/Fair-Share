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
import { getGoodsResults } from "../../../../ApiFunctions/getGoodsResults";

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

    // Session owner fetches data and updates firestore. Everyone else waits for results to update,
    useEffect(() => {
        if (isSessionLoaded && profile.isLoaded) {
            if (
                session &&
                session.active &&
                !profile.isEmpty &&
                session.owner === uid &&
                !session.results
            ) {
                // Get results.
                // First convert valuations in user array into a format compatible with API (see value matrix in /ApiFunctions).
                // Need to first convert to array to store order.
                // fsValuesArray[user][0] = uid, fsValuesArray[user][1] = details.
                const fsValuesArray = Object.entries(session.values);
                const userCount = session.group.length;
                const goodsCount = session.goods.length;
                var valueMatrix = Array.from(
                    Array(userCount),
                    () => new Array(goodsCount)
                );
                for (var i = 0; i < userCount; i++) {
                    for (var j = 0; j < goodsCount; j++) {
                        valueMatrix[i][j] = fsValuesArray[i][1].goods[j].Value;
                    }
                }

                // Goods or Rooms route.
                const allocations = {};
                if (goodType === "Rent") {
                    getRentResults(valueMatrix, session.totalCost)
                        .then((allocation) => {
                            allocation.map(
                                (user) =>
                                    (allocations[fsValuesArray[user.who][0]] = {
                                        email: fsValuesArray[user.who][1].email,
                                        username:
                                            fsValuesArray[user.who][1].username,
                                        room:
                                            fsValuesArray[user.who][1].goods[
                                                user.room
                                            ].Good,
                                        price: user.price,
                                    })
                            );
                            firestore
                                .update(
                                    {
                                        collection: "ShareSessions",
                                        doc: sessionID,
                                    },
                                    { allocations: allocations, active: false }
                                )
                                .then(() => {
                                    console.log("Results Saved");
                                })
                                .catch((err) => {
                                    console.log(err.message);
                                });
                        })
                        .catch((err) => {
                            console.log(err.message);
                        });
                } else if (goodType === "Goods") {
                    getGoodsResults(valueMatrix)
                        .then((allocation) => {
                            console.log(allocation);
                            // Create goodsList using good names instead of indexes.
                            allocation.map(
                                (user) =>
                                    (allocations[fsValuesArray[user.who][0]] = {
                                        email: fsValuesArray[user.who][1].email,
                                        username:
                                            fsValuesArray[user.who][1].username,
                                        goods: [...user.goodsList].map(
                                            (index) =>
                                                fsValuesArray[user.who][1]
                                                    .goods[index].Good
                                        ),
                                    })
                            );
                            firestore
                                .update(
                                    {
                                        collection: "ShareSessions",
                                        doc: sessionID,
                                    },
                                    { allocations: allocations, active: false }
                                )
                                .then(() => {
                                    console.log("Results Saved");
                                })
                                .catch((err) => {
                                    console.log(err.message);
                                });
                        })
                        .catch((err) => {
                            console.log(err.message);
                        });
                }
            }
        }
    }, [
        firestore,
        isSessionLoaded,
        profile,
        session,
        sessionID,
        uid,
        goodType,
    ]);

    //console.log(stateAllocation);
    if (isSessionLoaded && profile.isLoaded && userInSessionDetermined) {
        // Load.
        if (!profile.isEmpty) {
            // User must be logged in.
            if (session && userInSession) {
                // Session must exist and user must be in session group.
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
                                style={{ maxWidth: "700px" }}
                            >
                                {!session.allocations ? (
                                    <h1>Loading Results</h1>
                                ) : (
                                    <div>
                                        <h6>
                                            {session.allocations[uid].username},
                                            your envy-free allocation is:
                                        </h6>
                                        <Col sm='12 mt-5'>
                                            <h5>
                                                {session.type === "Rent"
                                                    ? session.allocations[uid]
                                                          .room +
                                                      " at $" +
                                                      session.allocations[uid]
                                                          .price
                                                    : session.allocations[uid]
                                                          .goods}
                                            </h5>
                                        </Col>
                                        <a
                                            href='/'
                                            style={{ textDecoration: "none" }}
                                        >
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
                                    </div>
                                )}
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

export default RemoteResultsPage;
