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
import { getDivorceResults } from "../../../../ApiFunctions/getDivorceResults";

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

    // Session owner fetches data and updates firestore. Everyone else waits for results to update,
    useEffect(() => {
        if (isSessionLoaded && profile.isLoaded) {
            if (
                session &&
                session.active &&
                !profile.isEmpty &&
                session.owner === uid &&
                !session.allocations
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

                // Rent, goods or divorce route.
                const allocations = {};
                if (session.type === "Rent" && goodsCount === userCount) {
                    // Extra check to make sure rent's matrix is square.
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
                                    console.log(err);
                                });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else if (session.type === "Goods") {
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
                                    console.log(err);
                                });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else if (session.type === "Divorce") {
                    getDivorceResults(valueMatrix, session.moneyAmount)
                        .then((allocation) => {
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
                                        money: user.money,
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
                                    console.log(err);
                                });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }
        }
    }, [firestore, isSessionLoaded, profile, session, sessionID, uid]);

    // Load.
    if (isSessionLoaded && profile.isLoaded && userInSessionDetermined) {
        // User must be logged in.
        if (!profile.isEmpty) {
            // Session must exist and user must be in session group.
            if (session && userInSession) {
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
                                            {session.type === "Divorce" ? (
                                                <h5>
                                                    + $
                                                    {
                                                        session.allocations[uid]
                                                            .money
                                                    }
                                                </h5>
                                            ) : null}
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
                return <Redirect to={``} />;
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
