import React, { useState } from "react";

// Bootstrap Components
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import ErrorAlertModal from "../../../Notifications/ErrorAlertModal";

// Redux
import { connect } from "react-redux";

const InputGoodsInfo = (props) => {
    // Goods Name.
    const [goodName, setGoodName] = useState("");
    const [goodValue, setGoodValue] = useState("");
    // Store error message.
    const [errorMessage, setErrorMessage] = useState("");

    //* Add good to state and store.
    //? Maybe make goods value and name not turn into a object for the state, i.e., simply pass goodName and goodValue.
    const addGood = (e) => {
        e.preventDefault();
        if (
            props.stateGoodsArray.filter((good) => good.Good === goodName)
                .length > 0
        ) {
            setErrorMessage("Error! Good with name already exists.");
            setGoodName("");
        } else if (goodName === "") {
            setErrorMessage("Error! Good name cannot be empty.");
        } else if (goodValue && goodValue < 1) {
            setErrorMessage("Error! Good value cannot be less than 1.");
            setGoodValue("");
        } else {
            let good = {
                Good: String(goodName),
                estValue: goodValue > 0 ? goodValue : "0",
                Value: 0,
            };
            // State
            props.addGoods(good);

            setGoodName("");
            setGoodValue("");
            setErrorMessage("");
        }
    };
    const deleteGood = (goodName) => {
        props.deleteGood(goodName);
    };
    // Next state.
    const nextPage = () => {
        if (props.stateGoodsArray.length < 1) {
            setErrorMessage("Error! Must have at least 1 item.");
        } else {
            setErrorMessage("");
            props.next();
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
                        {props.stateGoodsArray.map((good) => (
                            <Card
                                style={{ color: "#000" }}
                                key={good.Good}
                                body
                            >
                                {good.Good} {good.estValue ? "| $" : " "}
                                {good.estValue}
                                <button
                                    className='close'
                                    style={{ display: "block" }}
                                    onClick={() => deleteGood(good.Good)}
                                >
                                    ×
                                </button>
                            </Card>
                        ))}
                    </Col>
                </Row>
            </div>

            <div className='mt-4'>
                <ErrorAlertModal errorMessage={errorMessage} />

                {props.next ? (
                    <Button
                        variant='primary'
                        size='sm'
                        onClick={nextPage}
                        data-testid='submit'
                    >
                        <span className='smButtonText'>Next</span>
                    </Button>
                ) : null}
            </div>
        </div>
    );
};

// To access and modify redux store.
const mapStateToProps = (state) => {
    return {
        stateGoodsArray: state.distGoodsInfo.goodsArray,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addGoods: (good) => {
            dispatch({ type: "ADD_GOODS", good: good });
        },
        deleteGood: (goodName) => {
            dispatch({ type: "DELETE_GOOD", goodName: goodName });
        },
        updateTotalValue: (tValue) => {
            dispatch({ type: "UPDATE_TOTAL_VALUE", i: tValue });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputGoodsInfo);
