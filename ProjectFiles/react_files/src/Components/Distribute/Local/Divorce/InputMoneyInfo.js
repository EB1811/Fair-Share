import React, { useState } from "react";

// Bootstrap Components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import ErrorAlertModal from "../../../Notifications/ErrorAlertModal";

// Redux
import { connect } from "react-redux";

const InputMoneyInfo = (props) => {
    // Information about goods.
    const [moneyAmount, setMoneyAmount] = useState(
        props.session
            ? props.session.moneyAmount
                ? props.session.moneyAmount
                : 0
            : props.stateMoneyAmount
    );
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Conditional styling
        if (moneyAmount < 0) {
            setErrorMessage("Error: Amount cannot be negative.");
        } else {
            setErrorMessage("");
            // Action based on if remote or local method. Remote needs to pass info to next function so it can be added to firestore.
            if (props.session) {
                props.next(moneyAmount);
            } else {
                props.updateMoneyAmount(moneyAmount);
                props.next();
            }
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='addMoney'>
                <Form.Label>Cash available to share:</Form.Label>
                <Form.Control
                    size='sm'
                    type='number'
                    value={moneyAmount}
                    onChange={(e) => setMoneyAmount(e.target.value)}
                    data-testid='input_money_to_share'
                />
            </Form.Group>
            <div className='mt-4'>
                <ErrorAlertModal errorMessage={errorMessage} />

                <Button
                    variant='primary'
                    type='submit'
                    size='sm'
                    data-testid='submit'
                >
                    <span className='smButtonText'>Next</span>
                </Button>
            </div>
        </Form>
    );
};

// To access and modify redux store.
const mapStateToProps = (state) => {
    return {
        stateMoneyAmount: state.distGoodsInfo.moneyAmount,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateMoneyAmount: (moneyAmount) => {
            dispatch({
                type: "UPDATE_MONEY_TO_SHARE",
                moneyAmount: moneyAmount,
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputMoneyInfo);
