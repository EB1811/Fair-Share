import React, { useState } from "react";

// Bootstrap Components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import ErrorAlertModal from "../../../Notifications/ErrorAlertModal";

// Redux
import { connect } from "react-redux";

const InputRoomsInfo = (props) => {
    // Information about goods.
    const [houseValue, setHouseValue] = useState(
        props.session
            ? props.session.totalCost
                ? props.session.totalCost
                : 0
            : props.stateHouseValue
    );
    const [roomCount, setRoomCount] = useState(
        props.session
            ? props.session.goods
                ? props.session.goods.length
                : 0
            : props.stateRoomCount
    );
    // Store error message.
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Conditional styling
        if (roomCount < 2) {
            setErrorMessage("Error! Must have at least 2 rooms.");
        } else if (houseValue < 1) {
            setErrorMessage("Error! Total house cost must be greater than 0.");
        } else if (roomCount > 1 && houseValue > 0) {
            setErrorMessage("");

            // Action based on if remote or local method. Remote needs to pass info to next function so it can be added to firestore.
            if (props.session) {
                props.next(roomCount, houseValue);
            } else {
                props.addGoodsAmount(roomCount);
                props.updateTotalValue(houseValue);
                props.next();
            }
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
                    onChange={(e) => setRoomCount(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId='addGoodsTValue'>
                <Form.Label>Total monthly cost of house:</Form.Label>
                <Form.Control
                    size='sm'
                    type='number'
                    value={houseValue}
                    onChange={(e) => setHouseValue(e.target.value)}
                />
            </Form.Group>
            <div className='mt-5'>
                <ErrorAlertModal errorMessage={errorMessage} />
                <Button variant='primary' type='submit' size='sm'>
                    <span className='smButtonText'>Next</span>
                </Button>
            </div>
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
