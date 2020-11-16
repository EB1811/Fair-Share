import React, { useState } from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

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
                Next
            </Button>
        </Form>
    )
}

const InputGroupInfo = (props) => {
    // Update number of users on submit.
    const addToGroup = () => {
        props.setGroup(props.group.concat(props.group.length));
    }

    return (
        <Container fluid>
            <Row className="justify-content-sm-center" style={{ marginBottom: "20px"}}>
                <Col >
                    <Button style={{ margin: "0 20px"}} variant="primary" onClick={() => addToGroup()}>Add To Group</Button>
                    <Button style={{ margin: "0 20px"}} variant="primary" onClick={() => props.setStage(2)}>Next</Button>
                </Col>
            </Row>
            <Row className="justify-content-sm-center contentOverflow">
                <Col sm="8">
                    {props.group.map((id) => (
                        <Card body>User {id}</Card>
                    ))}
                </Col>
            </Row>
        </Container>
    )
}

const DistributeEntry = (props) => {
    // Stage determines which section of the goods entry input to render.
    const [stage, setStage] = useState(0);

    // Information about goods.
    const [goodsCount, setGoodsCount] = useState(0);
    const [goodsTotalVal, setgoodsTotalVal] = useState(0);

    // Information about the group.
    const [group, setGroup] = useState([]);

    switch(stage) {
        case 0:
            return (
                <Container fluid>
                    <Row>
                        <Col><h1 className="Title">{props.i} Entry</h1></Col>
                    </Row>
                    <Row className="justify-content-sm-center">
                        <Col sm="5"><InputGoodsInfo setGoodsCount={setGoodsCount} setGoodsTotalVal={setgoodsTotalVal} setStage={setStage}/></Col>
                    </Row>
                </Container>
            )
        case 1:
            return (
                <InputGroupInfo group={group} setGroup={setGroup} setStage={setStage}/>
            )
        case 2:
            return (
                <Container fluid>
                    <Row className="justify-content-sm-center">
                        <h1>{goodsCount}</h1>
                        <h1>{goodsTotalVal}</h1>
                        <h1>{group.length}</h1>
                    </Row>
                </Container>
            )
    }
}

export default DistributeEntry;
