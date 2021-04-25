import React, { useState } from "react";

// Bootstrap Components
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import ErrorAlertModal from "../../../../../Notifications/ErrorAlertModal";

import { useFirestore } from "react-redux-firebase";

const RemoteInputGoodsInfo = ({ next, session, sessionID }) => {
    const firestore = useFirestore();

    // Goods Name.
    const [goodName, setGoodName] = useState("");
    const [goodValue, setGoodValue] = useState("");
    // Store error message.
    const [errorMessage, setErrorMessage] = useState("");

    // Add 'good' to firestore.
    const addGood = (e) => {
        e.preventDefault();

        if (goodName === "") {
            setErrorMessage("Error! Good name cannot be empty.");
        } else if (goodValue && goodValue < 1) {
            setErrorMessage("Error! Good value cannot be less than 1.");
            setGoodValue("");
        } else {
            // Add if no goods already in firestore array.
            if (!session.goods) {
                let good = {
                    Good: String(goodName),
                    estValue: goodValue > 0 ? goodValue : "0",
                    Value: 0,
                };
                var newGoodsArr = [];
                newGoodsArr.push(good);

                var newGoodsTotalVal;
                if (newGoodsArr.some((good) => good.estValue > 0)) {
                    newGoodsTotalVal = newGoodsArr.reduce(
                        (t, good) => t + parseInt(good.estValue),
                        0
                    );
                    newGoodsTotalVal =
                        newGoodsTotalVal < 1000 ? 1000 : newGoodsTotalVal;
                } else {
                    newGoodsTotalVal = 1000;
                }

                firestore
                    .update(
                        { collection: "ShareSessions", doc: sessionID },
                        { goods: newGoodsArr, totalCost: newGoodsTotalVal }
                    )
                    .then(() => {
                        //console.log(session);

                        setGoodName("");
                        setGoodValue("");
                        setErrorMessage("");
                    })
                    .catch((err) => {
                        console.log(err.message);

                        setGoodName("");
                        setGoodValue("");
                        setErrorMessage("");
                    });
            } else if (
                session.goods.filter((good) => good.Good === goodName).length >
                0
            ) {
                // Check if good name is unique.
                setErrorMessage("Error! Good with name already exists.");
                setGoodName("");
            } else {
                let good = {
                    Good: String(goodName),
                    estValue: goodValue > 0 ? goodValue : "0",
                    Value: 0,
                };
                var goodsArr = [...session.goods];
                goodsArr.push(good);

                var goodsTotalVal;
                if (goodsArr.some((good) => good.estValue > 0)) {
                    goodsTotalVal = goodsArr.reduce(
                        (t, good) => t + parseInt(good.estValue),
                        0
                    );
                    goodsTotalVal = goodsTotalVal < 1000 ? 1000 : goodsTotalVal;
                } else {
                    goodsTotalVal = 1000;
                }
                // State
                firestore
                    .update(
                        { collection: "ShareSessions", doc: sessionID },
                        { goods: goodsArr, totalCost: goodsTotalVal }
                    )
                    .then(() => {
                        //console.log(session);

                        setGoodName("");
                        setGoodValue("");
                        setErrorMessage("");
                    })
                    .catch((err) => {
                        //console.log(err.message);

                        setGoodName("");
                        setGoodValue("");
                        setErrorMessage("");
                    });
            }
        }
    };

    const deleteGood = (goodName) => {
        // Return group without user with userEmail.
        const newGoodsArr = [...session.goods].filter((good) => {
            return good.Good !== goodName;
        });
        firestore
            .update(
                { collection: "ShareSessions", doc: sessionID },
                { goods: newGoodsArr }
            )
            .then(() => {
                console.log("Good Successfully Deleted.");
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    // Next state.
    const nextPage = () => {
        if (session.goods && session.goods.length > 0) {
            setErrorMessage("");
            next();
        } else {
            setErrorMessage("Error! Must have at least 1 item.");
        }
    };

    return (
        <div>
            <h5>Add your custom goods.</h5>
            <div
                className='mt-4 py-2'
                style={{
                    borderTop: "1px solid #999999",
                    borderBottom: "1px solid #999999",
                }}
            >
                <Form onSubmit={addGood}>
                    <Row className='align-items-center'>
                        <Col xs={12} sm={9}>
                            <Form.Control
                                size='sm'
                                placeholder='Name'
                                value={goodName}
                                type='text'
                                onChange={(e) => setGoodName(e.target.value)}
                                data-testid='input_custom_good_name'
                                style={{
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    display: "inline",
                                }}
                            />
                            <Form.Control
                                size='sm'
                                placeholder='Estimated Value (Optional)'
                                value={goodValue}
                                type='number'
                                onChange={(e) => setGoodValue(e.target.value)}
                                data-testid='input_custom_good_estValue'
                                style={{
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    display: "inline",
                                }}
                                className='mt-1'
                            />
                        </Col>
                        <Col xs={12} sm={3}>
                            <Button
                                variant='primary'
                                size='md'
                                className='m-3'
                                type='submit'
                                data-testid='add_custom_good'
                            >
                                <span>Add</span>
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <hr />
                <Row className='justify-content-center contentOverflow mt-3'>
                    <Col sm='10'>
                        {session.goods
                            ? session.goods.map((good) => (
                                  <Card
                                      style={{ color: "#000" }}
                                      key={good.Good}
                                      body
                                  >
                                      {good.Good} | {good.estValue}
                                      <button
                                          className='close'
                                          style={{ display: "block" }}
                                          onClick={() => deleteGood(good.Good)}
                                      >
                                          ×
                                      </button>
                                  </Card>
                              ))
                            : ""}
                    </Col>
                </Row>
            </div>

            <div className='mt-4'>
                <ErrorAlertModal errorMessage={errorMessage} />

                <Button
                    variant='primary'
                    size='sm'
                    onClick={nextPage}
                    data-testid='submit'
                >
                    <span className='smButtonText'>Next</span>
                </Button>
            </div>
        </div>
    );
};

export default RemoteInputGoodsInfo;
