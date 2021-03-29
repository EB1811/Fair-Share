import React, { useState } from "react";

// Bootstrap Components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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

    const handleSubmit = (e) => {
        e.preventDefault();

        // Conditional styling
        if (moneyAmount < 0) {
            console.log("Cannot be negative");
        } else {
            // Remove any error messages.

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
