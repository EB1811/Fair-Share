import React, { useState } from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

// Redux
import { connect } from 'react-redux';


const InputGroupInfo = (props) => {
    // User ID.
    const [userId, setUserId] = useState("");
    // Local group for rendering.
    const [localGroup, setLocalGroup] = useState([]);
    // Failed bool
    const [failed, setFailed] = useState(false);

    // Update number of users on submit.
    const addToGroup = () => {
        if(localGroup.includes(userId)) {
            setFailed(true);
            setUserId("");
        } else {
            props.addUser(userId);
            setLocalGroup(localGroup.concat(userId));
            setUserId("");
            setFailed(false);
        }
    }

    return (
        <Container fluid>
            <Row className="justify-content-center" style={{ marginBottom: "20px"}}>
                <Row className="w-100 justify-content-center">
                <Col xs="12" lg="5" className="align-items-center" style={{margin: "5px 0"}}>
                    <div className="h-100 align-items-center d-flex">
                        {
                            failed 
                            ? <Form.Control size="sm" placeholder="Invalid User" value={userId} type="text" onChange={e => setUserId(e.target.value)}  style={{border: "1px solid red", marginLeft: "auto", marginRight: "auto", display: "block"}}/>
                            : <Form.Control size="sm" placeholder="Enter User ID" value={userId} type="text" onChange={e => setUserId(e.target.value)}  style={{marginLeft: "auto", marginRight: "auto", display: "block"}}/>
                        }
                    </div>
                </Col>
                </Row>
                <Button style={{ margin: "4px 20px"}} variant="primary" onClick={() => addToGroup()}><span className="medButtonText">Add To Group</span></Button>
                <Button style={{ margin: "4px 20px"}} variant="primary" onClick={() => props.setStage(2)}><span className="medButtonText">Next</span></Button>
            </Row>
            <Row className="justify-content-center contentOverflow">
                <Col sm="8">
                    {localGroup.map((id) => (
                        <Card style={{color: "#000"}} key={id} body>User {id}</Card>
                    ))}
                </Col>
            </Row>
        </Container>
    )
}

// To access and modify redux store.
const mapStateToProps = (state) => {
    return {
        group: state.distGroupInfo.userArray
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (userId) => { dispatch({type: 'ADD_USER', id: userId}) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputGroupInfo);;