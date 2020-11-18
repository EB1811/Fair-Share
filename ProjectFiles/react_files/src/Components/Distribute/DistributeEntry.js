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

const InputGoodsInfo = ({setStage}) => {
    // Information about goods.
    const [goodsTotalVal, setgoodsTotalVal] = useState(0);
    const [goodsCount, setGoodsCount] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();

        setStage(1);
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

const InputGroupInfo = ({setStage}) => {
    // Information about the group.
    const [group, setGroup] = useState([]);

    // Update number of users on submit.
    const addToGroup = () => {
        setGroup(group.concat(group.length));
    }

    return (
        <Container fluid>
            <Row className="justify-content-sm-center" style={{ marginBottom: "20px"}}>
                <Col>
                    <Button style={{ margin: "4px 20px"}} variant="primary" onClick={() => addToGroup()}><span className="medButtonText">Add To Group</span></Button>
                    <Button style={{ margin: "4px 20px"}} variant="primary" onClick={() => setStage(2)}><span className="medButtonText">Next</span></Button>
                </Col>
            </Row>
            <Row className="justify-content-sm-center contentOverflow">
                <Col sm="8">
                    {group.map((id) => (
                        <Card key={id} body>User {id}</Card>
                    ))}
                </Col>
            </Row>
        </Container>
    )
}

const DistributeEntry = (props) => {
    // Stage determines which section of the goods entry input to render.
    const [stage, setStage] = useState(0);

    switch(stage) {
        case 0:
            return (
                <Container fluid>
                    <Row className="justify-content-sm-center">
                        <Col xs={12} sm={5}><InputGoodsInfo setStage={setStage}/></Col>
                    </Row>
                </Container>
            )
        case 1:
            return (
                <InputGroupInfo setStage={setStage}/>
            )
        case 2:
            return (
                <Container fluid>
                    <Row className="justify-content-sm-center">
                        <Col >
                            <h2>Number of {props.goodType}: </h2>
                        </Col>
                        
                    </Row>
                    <Row className="justify-content-sm-center">
                        <Col>
                            <h2>Total value of {props.goodType}: </h2>
                        </Col>
                    </Row>
                    <Row className="justify-content-sm-center">
                        <Col>
                            <h2>Users: </h2>
                        </Col>
                    </Row>
                    <Row className="justify-content-sm-center">
                        <Col xs={12} sm={4} md={3} lg={2}>
                            <Link style={{textDecoration: "none"}} to='/Distribute/Valuations'>
                                <Button variant="primary" size="lg" block style={{borderColor: '#ffffff'}}>
                                    <span className="medButtonText">Next</span>
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            )
    }
}

export default DistributeEntry;
