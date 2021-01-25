import React, { useState } from 'react'

// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Redux
import { connect } from 'react-redux';

const InputGoodsInfo = (props) => {
    // Information about goods.
    const [goodsTotalVal, setgoodsTotalVal] = useState(0);
    const [goodsCount, setGoodsCount] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();

        props.addGoodsAmount(goodsCount, props.goodType);
        props.updateTotalValue(goodsTotalVal);
        props.setStage(1);
    }

    return (
        <Form onSubmit = {handleSubmit}>
            <Form.Group controlId="addGoodsCount">
                {
                    props.goodType.toLowerCase() === 'rent'
                    ? <Form.Label>Number of rooms:</Form.Label>
                    : <Form.Label>Number of goods:</Form.Label>
                }
                <Form.Control size="sm" type="text" onChange={e => setGoodsCount(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="addGoodsTValue">
                {
                    props.goodType.toLowerCase() === 'rent'
                    ? <Form.Label>Total monthly value of house:</Form.Label>
                    : <Form.Label>Total value of goods:</Form.Label>
                }
                <Form.Control size="sm" type="text" onChange={e => setgoodsTotalVal(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit" size="sm" className="mt-5"> 
                <span className="smButtonText">Next</span>
            </Button>
        </Form>
    )
}

// To access and modify redux store.
const mapStateToProps = (state) => {
    return {
        ////temp: state.distGoodsInfo.goodsArray
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addGoodsAmount: (item, type) => { dispatch({type: 'ADD_GOODS_AMOUNT', i: item, t: type}) },
        updateTotalValue: (tValue) => { dispatch({type: 'UPDATE_TOTAL_VALUE', i: tValue}) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputGoodsInfo);