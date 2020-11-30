import React, { useState, useEffect } from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

// Redux
import { connect } from 'react-redux';

const InputValuations = (props) => {
    const [tempValue, setTempValue] = useState(props.curGood.Value);

    const handleChange = (e) => {
        setTempValue(e.target.value);

        props.curGood.value = tempValue;
    }

    return (
        <Form.Group controlId="valuation">
            <Form.Label>{props.curGood.Good} Value</Form.Label>
            <Col>
                <Form.Control type="range" value={tempValue} min={0} max={100} step={1} onChange={handleChange} style={{width: "90%", display: "inline-block"}}/>
                <Form.Label style={{width: "10%", margin: "5 0px"}}>{tempValue}</Form.Label>
            </Col>
        </Form.Group>
    )
}

const DistributeGoodsPage = (props) => {
    // Valuations. REDUX
    const [goodsArr, setGoodsArr] = useState(props.temp);

    // Update valuations on submit.
    const handleSubmit = (e) => {
        e.preventDefault();

        props.history.push('/Results')
    }

    return (
        <Container fluid style={{height: "100vh"}}>
            <Row className="justify-content-sm-center align-items-center h-100">
                <Col sm="6">
                    <Form onSubmit = {handleSubmit}>
                        {goodsArr.map((good) => <InputValuations key={good.Good} curGood={good} goodsArr={goodsArr}/>)}

                        <Button variant="primary" type="submit">
                            Finish
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DistributeGoodsPage);




