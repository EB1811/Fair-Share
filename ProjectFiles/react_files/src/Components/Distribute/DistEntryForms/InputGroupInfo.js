import React, { useState } from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

// Redux
import { connect } from 'react-redux';


const InputGroupInfo = (props) => {
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
                    <Button style={{ margin: "4px 20px"}} variant="primary" onClick={() => props.setStage(2)}><span className="medButtonText">Next</span></Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(InputGroupInfo);;