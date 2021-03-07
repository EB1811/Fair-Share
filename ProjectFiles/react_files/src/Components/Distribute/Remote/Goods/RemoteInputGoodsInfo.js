import React, { useState } from "react";

// Bootstrap Components
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { useFirestore } from "react-redux-firebase";

const RemoteInputGoodsInfo = ({ next, session, sessionID }) => {
    const firestore = useFirestore();
    // Goods Name.
    const [goodName, setGoodName] = useState("");
    const [goodValue, setGoodValue] = useState("");
    // Failed bool used for conditional css.
    //? Maybe turn this into alert.
    const [nameFailed, setNameFailed] = useState(false);
    const [nameFailedEmpty, setNameFailedEmpty] = useState(false);
    const [valueFailed, setValueFailed] = useState(false);
    const [goodsCountFailed, setGoodsCountFailed] = useState(false);

    // Add 'good' to firestore.
    const addGood = (e) => {
        e.preventDefault();

        if (goodName === "") {
            setNameFailed(true);
            setNameFailedEmpty(true);
        } else if (goodValue && goodValue < 1) {
            setValueFailed(true);
            setGoodValue("");
        } else {
            // Add if no goods already in firestore array.
            if (!session.goods) {
                let good = {
                    Good: String(goodName),
                    estValue: goodValue,
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
                        console.log(session);

                        setGoodName("");
                        setGoodValue("");
                        setNameFailed(false);
                        setNameFailedEmpty(false);
                        setValueFailed(false);
                    })
                    .catch((err) => {
                        console.log(err.message);

                        setGoodName("");
                        setGoodValue("");
                        setNameFailed(false);
                        setNameFailedEmpty(false);
                        setValueFailed(false);
                    });
            } else if (
                session.goods.filter((good) => good.Good === goodName).length >
                0
            ) {
                // Check if good name is unique.
                setNameFailed(true);
                setNameFailedEmpty(false);
                setGoodName("");
            } else {
                let good = {
                    Good: String(goodName),
                    estValue: goodValue,
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
                        console.log(session);

                        setGoodName("");
                        setGoodValue("");
                        setNameFailed(false);
                        setNameFailedEmpty(false);
                        setValueFailed(false);
                    })
                    .catch((err) => {
                        console.log(err.message);

                        setGoodName("");
                        setGoodValue("");
                        setNameFailed(false);
                        setNameFailedEmpty(false);
                        setValueFailed(false);
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
        if (session.goods && session.goods.length < 2) {
            setGoodsCountFailed(true);
        } else {
            setGoodsCountFailed(false);
            next();
        }
    };

    return (
        <div>
            <h5>Enter a item's name and price.</h5>
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
                            {nameFailed ? (
                                <Form.Control
                                    size='sm'
                                    placeholder={
                                        nameFailedEmpty
                                            ? "Name cannot be empty"
                                            : "Good with name already exists"
                                    }
                                    value={goodName}
                                    type='text'
                                    onChange={(e) =>
                                        setGoodName(e.target.value)
                                    }
                                    style={{
                                        border: "1px solid red",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        display: "inline",
                                    }}
                                />
                            ) : (
                                <Form.Control
                                    size='sm'
                                    placeholder='Name'
                                    value={goodName}
                                    type='text'
                                    onChange={(e) =>
                                        setGoodName(e.target.value)
                                    }
                                    style={{
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        display: "inline",
                                    }}
                                />
                            )}
                            {valueFailed ? (
                                <Form.Control
                                    size='sm'
                                    placeholder='Value cannot be less than 1'
                                    value={goodValue}
                                    type='number'
                                    onChange={(e) =>
                                        setGoodValue(e.target.value)
                                    }
                                    style={{
                                        border: "1px solid red",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        display: "inline",
                                    }}
                                    className='mt-1'
                                />
                            ) : (
                                <Form.Control
                                    size='sm'
                                    placeholder='Estimated Value (Optional)'
                                    value={goodValue}
                                    type='number'
                                    onChange={(e) =>
                                        setGoodValue(e.target.value)
                                    }
                                    style={{
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        display: "inline",
                                    }}
                                    className='mt-1'
                                />
                            )}
                        </Col>
                        <Col xs={12} sm={3}>
                            <Button
                                variant='primary'
                                size='md'
                                className='m-3'
                                type='submit'
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
                {goodsCountFailed ? (
                    <Alert variant={"danger"}>
                        Error! Must have at least 2 items.
                    </Alert>
                ) : null}

                <Button variant='primary' size='sm' onClick={nextPage}>
                    <span className='smButtonText'>Next</span>
                </Button>
            </div>
        </div>
    );
};

export default RemoteInputGoodsInfo;
