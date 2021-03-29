import React, { useState } from "react";

// Bootstrap Components
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

// Redux
import { connect } from "react-redux";

const InputGoodsInfo = (props) => {
    // Goods Name.
    const [goodName, setGoodName] = useState("");
    const [goodValue, setGoodValue] = useState("");
    // Failed bool used for conditional css.
    const [nameFailed, setNameFailed] = useState(false);
    const [nameFailedEmpty, setNameFailedEmpty] = useState(false);
    const [valueFailed, setValueFailed] = useState(false);
    const [goodsCountFailed, setGoodsCountFailed] = useState(false);

    //* Add good to state and store.
    //? Maybe make goods value and name not turn into a object for the state, i.e., simply pass goodName and goodValue.
    const addGood = (e) => {
        e.preventDefault();
        if (
            props.stateGoodsArray.filter((good) => good.Good === goodName)
                .length > 0
        ) {
            setNameFailed(true);
            setNameFailedEmpty(false);
            setGoodName("");
        } else if (goodName === "") {
            setNameFailed(true);
            setNameFailedEmpty(true);
        } else if (goodValue && goodValue < 1) {
            setValueFailed(true);
            setGoodValue("");
        } else {
            let good = {
                Good: String(goodName),
                estValue: goodValue,
                Value: 0,
            };
            // State
            props.addGoods(good);

            setGoodName("");
            setGoodValue("");
            setNameFailed(false);
            setNameFailedEmpty(false);
            setValueFailed(false);
        }
    };
    const deleteGood = (goodName) => {
        props.deleteGood(goodName);
    };
    // Next state.
    const nextPage = () => {
        if (props.stateGoodsArray.length < 2) {
            setGoodsCountFailed(true);
        } else {
            setGoodsCountFailed(false);
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
                        {props.stateGoodsArray.map((good) => (
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
                        ))}
                    </Col>
                </Row>
            </div>

            <div className='mt-4'>
                {goodsCountFailed ? (
                    <Alert variant={"danger"}>
                        Error! Must have at least 2 items.
                    </Alert>
                ) : null}

                {props.next ? (
                    <Button variant='primary' size='sm' onClick={nextPage}>
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
