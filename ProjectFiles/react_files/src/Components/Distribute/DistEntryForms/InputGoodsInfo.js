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

        props.addTemp(goodsCount);
        props.setStage(1);
    }

    return (
        <Form onSubmit = {handleSubmit}>
            <Form.Group controlId="addGoodsCount">
                <Form.Label>Number of rooms</Form.Label>
                <Form.Control type="text" onChange={e => setGoodsCount(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="addGoodsTValue">
                <Form.Label>Total monthly value of house</Form.Label>
                <Form.Control type="text" onChange={e => setgoodsTotalVal(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit" size="lg">
                <span className="medButtonText">Next</span>
            </Button>
        </Form>
    )
}

// To access and modify redux store.
const mapStateToProps = (state) => {
    return {
        temp: state.distGoodsInfo.temp2
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTemp: (item) => { dispatch({type: 'GOODS_ACTION1', i: item}) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputGoodsInfo);