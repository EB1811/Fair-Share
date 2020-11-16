import React, { useState } from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const InputValuations = (props) => {
    return (
        <Form.Group controlId="valuation">
            <Form.Label>Room Value</Form.Label>
            <Form.Control type="range" value={props.valuationsInput} min={0} max={100} step={1} onChange={e => props.setValuationsInput(e.target.value)}/>
            <Form.Label>{props.valuationsInput}</Form.Label>
        </Form.Group>
    )
}

const DistributeGoodsPage = () => {
    // Valuations.
    const [valuationsInput, setValuationsInput] = useState(0);
    const [goodsArr, setGoodsArr] = useState([]);
    const [valuations, setValuations] = useState([]);

    const createGoodsArr = (count) => {
        var i;
        for(i=0; i<count; i++){
            setGoodsArr(goodsArr.concat("Room" + i));
        }
    }

    // Update valuations on submit.
    const handleSubmit = (e) => {
        e.preventDefault();

        setValuations(valuations.concat(valuationsInput));
    }

    return (
        <Container fluid>
            <Row className="justify-content-sm-center">
                <Col sm="8">
                    <Form onSubmit = {handleSubmit}>
                        <InputValuations valuationsInput={valuationsInput} setValuationsInput={setValuationsInput}/>
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




