import React, { useState } from "react";

// Bootstrap Components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Redux
import { connect } from "react-redux";

const InputValuationsForGood = (props) => {
    const handleChange = (e) => {
        props.curGood.Value = e.target.value;

        props.setTotal(
            props.usersGoodsArr.reduce(
                (sum, { Value }) => sum + parseInt(Value),
                0
            )
        );
    };

    return (
        <Form.Group controlId='valuation' style={{ margin: "0px" }}>
            <div>
                <h5 className='lowWeight'>{props.curGood.Good} Value</h5>
            </div>

            <div>
                <Form.Control
                    type='range'
                    value={props.curGood.Value}
                    min={0}
                    max={props.tValue}
                    step={1}
                    onInput={handleChange}
                    onChange={handleChange}
                    style={{ width: "90%", display: "inline-block" }}
                />
                <Form.Label style={{ width: "10%", margin: "5 0px" }}>
                    {props.curGood.Value}
                </Form.Label>
            </div>
        </Form.Group>
    );
};

const InputValuationsForm = (props) => {
    const [total, setTotal] = useState(0);

    // Update redux valuations store on submit.
    const handleSubmit = (e) => {
        e.preventDefault();
        ////console.log(props.usersArr);
        setTotal(0);
        props.nextUser();
    };

    return (
        <Form onSubmit={handleSubmit} className='mt-5'>
            {props.usersArr[props.currUser].userGoodsArr.map((good) => (
                <InputValuationsForGood
                    key={good.Good}
                    curGood={good}
                    usersGoodsArr={props.usersArr[props.currUser].userGoodsArr}
                    setTotal={setTotal}
                    tValue={props.tValue}
                />
            ))}

            <div className='mt-3'>
                <h5 className='lowWeight'>Total Value: {total}</h5>
            </div>
            <Button variant='primary' size='sm' className='mt-5' type='submit'>
                <span className='smButtonText'>
                    {props.currUser >= props.usersArr.length - 1
                        ? "Finish"
                        : "Next User"}
                </span>
            </Button>
        </Form>
    );
};

//* To access and modify redux store.
const mapStateToProps = (state) => {
    return {
        tValue: state.distGoodsInfo.totalValue,
        usersArr: state.distGroupInfo.userArray,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateGoodsValuations: (arr) => {
            dispatch({ type: "UPDATE_VALUATIONS", updatedArr: arr });
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InputValuationsForm);
