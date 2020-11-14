import React, { useState } from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

// React Router
import { Link } from 'react-router-dom';

const InputGoodsInfo = (props) => {
    const [goodsCountInput, setGoodsCountInput] = useState("");
    const [goodsTotalValInput, setgoodsTotalValInput] = useState("");

    // Update number of goods and their total value on submit.
    const handleSubmit = (e) => {
        e.preventDefault();

        props.setGoodsCount(goodsCountInput);
        props.setGoodsTotalVal(goodsTotalValInput);
        props.setStage(1);
    }

    return (
        <Form onSubmit = {handleSubmit}>
            <Form.Group controlId="addGoodsCount">
                <Form.Label>Number of rooms</Form.Label>
                <Form.Control type="text" onChange={e => setGoodsCountInput(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="addGoodsTValue">
                <Form.Label>Total monthly value of house</Form.Label>
                <Form.Control type="text" onChange={e => setgoodsTotalValInput(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

const InputGroupInfo = (props) => {
    const [groupCountInput, setGroupCountInput] = useState("");

    // Update number of users on submit.
    const handleSubmit = (e) => {
        e.preventDefault();

        props.setGroupCount(groupCountInput);
        props.setStage(2);
    }

    return (
        <Form onSubmit = {handleSubmit}>
            <Form.Group controlId="InputGroupCount">
                <Form.Label>Number of people in the group</Form.Label>
                <Form.Control type="text" onChange={e => setGroupCountInput(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

const DistributeEntry = (props) => {

    // Stage determines which section of the goods entry input to render.
    const [stage, setStage] = useState(0);

    // Information about goods.
    const [goodsCount, setGoodsCount] = useState(0);
    const [goodsTotalVal, setgoodsTotalVal] = useState(0);

    // Information about the group.
    const [groupCount, setGroupCount] = useState(0);

    switch(stage) {
        case 0:
            return (
                <Container fluid>
                    <Row>
                        <Col><h1 className="Title">{props.goodType} Entry</h1></Col>
                    </Row>
                    <Row className="justify-content-sm-center">
                        <Col sm="5"><InputGoodsInfo setGoodsCount={setGoodsCount} setGoodsTotalVal={setgoodsTotalVal} setStage={setStage}/></Col>
                    </Row>
                </Container>
            )
        case 1:
            return (
                <Container fluid>
                    <Row>
                        <Col><h1 className="Title">{props.goodType} Entry</h1></Col>
                    </Row>
                    <Row className="justify-content-sm-center">
                    <Col sm="5"><InputGroupInfo setGroupCount={setGroupCount} setStage={setStage}/></Col>
                    </Row>
                </Container>
            )
        case 2:
            return (
                <Container fluid>
                    <Row>
                        <Col><h1 className="Title">{props.goodType} Entry</h1></Col>
                    </Row>
                    <Row>
                        <h1>{goodsCount}</h1>
                        <h1>{goodsTotalVal}</h1>
                        <h1>{groupCount}</h1>
                    </Row>
                </Container>
            )
    }
}

export default DistributeEntry;
