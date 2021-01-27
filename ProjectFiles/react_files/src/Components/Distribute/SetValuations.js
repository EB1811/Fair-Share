import React, { useState } from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

// Redux
import { connect } from "react-redux";

const InputValuations = (props) => {
    const [tempValue, setTempValue] = useState(props.curGood.Value);

    const handleChange = (e) => {
        setTempValue(e.target.value);
        props.curGood.Value = e.target.value;

        props.setTotal(
            props.goodsArr.reduce((sum, { Value }) => sum + parseInt(Value), 0)
        );
    };

    return (
        <Form.Group controlId='valuation' style={{ margin: "0px" }}>
            <div>
                <Form.Label>{props.curGood.Good} Value</Form.Label>
            </div>

            <div>
                <Form.Control
                    type='range'
                    value={tempValue}
                    min={0}
                    max={props.tValue}
                    step={1}
                    onInput={handleChange}
                    onChange={handleChange}
                    style={{ width: "90%", display: "inline-block" }}
                />
                <Form.Label style={{ width: "10%", margin: "5 0px" }}>
                    {tempValue}
                </Form.Label>
            </div>
        </Form.Group>
    );
};

const DistributeGoodsPage = (props) => {
    // Valuations.
    const [localgoodsArr] = useState(props.goodsArr);
    const [total, setTotal] = useState(0);

    // Update redux valuations store on submit.
    const handleSubmit = (e) => {
        e.preventDefault();
        ////console.log(localgoodsArr.reduce((sum, {Value}) => sum + parseInt(Value), 0));
        props.updateGoodsValuations(localgoodsArr);
        props.history.push("/Results");
    };

    return (
        <Container fluid className='divBlockWithContentTertiary min-vh-100'>
            <Row className='justify-content-center align-items-center min-vh-100'>
                <Col xs={12} sm={6} className='centerCard m-3'>
                    <h4 className='descText'>
                        Please enter your valuation for each item:
                    </h4>

                    <Form onSubmit={handleSubmit} className='mt-5'>
                        {localgoodsArr.map((good) => (
                            <InputValuations
                                key={good.Good}
                                curGood={good}
                                goodsArr={localgoodsArr}
                                setTotal={setTotal}
                                tValue={props.tValue}
                            />
                        ))}

                        <div className='mt-3'>
                            <Form.Label>Total Value: {total}</Form.Label>
                        </div>
                        <Button
                            variant='primary'
                            size='sm'
                            className='mt-5'
                            type='submit'
                        >
                            <span className='smButtonText'>Submit</span>
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

//* To access and modify redux store.
const mapStateToProps = (state) => {
    return {
        goodsArr: state.distGoodsInfo.goodsArray,
        tValue: state.distGoodsInfo.totalValue,
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
)(DistributeGoodsPage);
