import React, { useState } from "react";

// Bootstrap Components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Redux
import { connect } from "react-redux";

const InputRoomsInfo = (props) => {
    // Information about goods.
    const [houseValue, setHouseValue] = useState(props.stateHouseValue);
    const [roomCount, setRoomCount] = useState(props.stateRoomCount);
    // Failed bool used for conditional css.
    const [roomCountFailed, setRoomCountFailed] = useState(false);
    const [houseValueFailed, setHouseValueFailed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Conditional styling
        if (roomCount < 2) {
            setRoomCountFailed(true);
            setRoomCount("");
        } else {
            setRoomCountFailed(false);
        }
        if (houseValue < 1) {
            setHouseValueFailed(true);
            setHouseValue("");
        } else {
            setHouseValueFailed(false);
        }

        if (roomCount > 1 && houseValue > 0) {
            setRoomCountFailed(false);
            setHouseValueFailed(false);

            props.addGoodsAmount(roomCount);
            props.updateTotalValue(houseValue);
            props.setStage(1);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='addRoomCount'>
                <Form.Label>Number of rooms:</Form.Label>
                <Form.Control
                    size='sm'
                    type='number'
                    value={roomCount}
                    placeholder={
                        roomCountFailed ? "Must have at least 2 rooms." : ""
                    }
                    style={roomCountFailed ? { border: "1px solid red" } : {}}
                    onChange={(e) => setRoomCount(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId='addGoodsTValue'>
                <Form.Label>Total monthly cost of house:</Form.Label>
                <Form.Control
                    size='sm'
                    type='number'
                    value={houseValue}
                    placeholder={
                        houseValueFailed
                            ? "Total cost must be greater than 0."
                            : ""
                    }
                    style={houseValueFailed ? { border: "1px solid red" } : {}}
                    onChange={(e) => setHouseValue(e.target.value)}
                />
            </Form.Group>
            <Button variant='primary' type='submit' size='sm' className='mt-5'>
                <span className='smButtonText'>Next</span>
            </Button>
        </Form>
    );
};

// To access and modify redux store.
const mapStateToProps = (state) => {
    return {
        stateRoomCount: state.distGoodsInfo.goodsArray.length,
        stateHouseValue: state.distGoodsInfo.totalValue,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addGoodsAmount: (item) => {
            dispatch({ type: "ADD_ROOMS", roomCount: item });
        },
        updateTotalValue: (tValue) => {
            dispatch({ type: "UPDATE_TOTAL_VALUE", i: tValue });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputRoomsInfo);
