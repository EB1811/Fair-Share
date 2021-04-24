import React, { useState } from "react";

// Bootstrap Components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import ErrorAlertModal from "../../../Notifications/ErrorAlertModal";

const InputValuationsForGood = ({ good, changeGoodValue, totalCost }) => {
    const handleChange = (e) => {
        changeGoodValue(good, parseInt(e.target.value));
    };

    return (
        <Form.Group controlId='valuation' style={{ margin: "0px" }}>
            <h5 className='lowWeight'>{good.Good} Value</h5>

            <Form.Control
                type='range'
                value={good.Value}
                min={0}
                max={totalCost}
                step={1}
                onInput={handleChange}
                onChange={handleChange}
                style={{ width: "90%", display: "inline-block" }}
            />
            <Form.Label style={{ width: "10%", margin: "5 0px" }}>
                {good.Value}
            </Form.Label>
        </Form.Group>
    );
};

const RemoteInputValuations = (props) => {
    const [total, setTotal] = useState(0);
    const [userGoodsArr, setUserGoodsArr] = useState(props.goods);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.goodType === "Rent" && total < props.totalCost) {
            setErrorMessage(
                "Error! Total must be greater or equal to " + props.totalCost
            );
        } else {
            props.storeValuations(userGoodsArr, total);
        }
    };

    // Sets value of the specific good in userGoodsArr to new value.
    const changeGoodValue = (good, newValue) => {
        const newUserGoodsArr = [...userGoodsArr].map((object) => {
            if (object.Good === good.Good) {
                return {
                    ...object,
                    Value: newValue,
                };
            } else return object;
        });

        setUserGoodsArr(newUserGoodsArr);

        setTotal(
            newUserGoodsArr.reduce((sum, { Value }) => sum + parseInt(Value), 0)
        );
    };

    return (
        <Form onSubmit={handleSubmit} className='mt-5'>
            {userGoodsArr.map((good) => (
                <InputValuationsForGood
                    key={good.Good}
                    good={good}
                    userGoodsArr={userGoodsArr}
                    changeGoodValue={changeGoodValue}
                    totalCost={props.totalCost}
                />
            ))}

            <div className='mt-3'>
                <h5 className='lowWeight'>Total Value: {total}</h5>
            </div>
            <div className='mt-5'>
                <ErrorAlertModal errorMessage={errorMessage} />
                <Button
                    variant='primary'
                    size='sm'
                    type='submit'
                    data-testid='submit'
                >
                    <span className='smButtonText'>Finish</span>
                </Button>
            </div>
        </Form>
    );
};

export default RemoteInputValuations;
