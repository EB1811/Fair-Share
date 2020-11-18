import React, { useState } from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const InputValuations = (props) => {
    const [tempValue, setTempValue] = useState(props.curGood.value);

    const handleChange = (e) => {
        setTempValue(e.target.value);

        props.curGood.value = tempValue;
    }

    return (
        <Form.Group controlId="valuation">
            <Form.Label>Room {props.curGood.id} Value</Form.Label>
            <Form.Control type="range" value={tempValue} min={0} max={100} step={1} onChange={handleChange}/>
            <Form.Label>{tempValue}</Form.Label>
        </Form.Group>
    )
}

// Use to create goods from redux.
/*
const createGoodsArr = (count) => {
    var i;
    var good;
    for(i=0; i<count; i++){
        good = {Good: "Room " + i, Value: 0}
        setGoodsArr(goodsArr.concat(good));
    }
}
*/

const DistributeGoodsPage = () => {
    // Valuations. REDUX
    const [goodsArr, setGoodsArr] = useState([
        { good: "Room 1", value: 50, id: 1 },
        { good: "Room 2", value: 0, id: 2 },
        { good: "Room 3", value: 0, id: 3 }
    ]);

    

    // Update valuations on submit.
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(goodsArr);
    }

    return (
        <Container fluid>
            <Row className="justify-content-sm-center">
                <Col sm="8">
                    <Form onSubmit = {handleSubmit}>
                        {goodsArr.map((good) => <InputValuations key={good.id} curGood={good} goodsArr={goodsArr}/>)}

                        <Button variant="primary" type="submit">
                            Next
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default DistributeGoodsPage;




