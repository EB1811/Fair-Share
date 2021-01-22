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

// React Router
import { Link } from 'react-router-dom';

const InputGroupInfo = (props) => {
    // User ID.
    const [userId, setUserId] = useState("");
    // Local group for rendering.
    const [localGroup, setLocalGroup] = useState([]);
    // Failed bool
    const [failed, setFailed] = useState(false);

    //* Update number of users on submit.
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
        <Container fluid className="divBlockWithContentTertiary min-vh-100">
            <Row className="justify-content-center align-items-center min-vh-100">
                <Col xs={12} sm={3} className="centerCardCompact m-3">
                    <h5 className="descText">Please input a user id to add them to the group.</h5>
                    <div className="mt-5 py-2" style={{borderTop: "1px solid #999999", borderBottom: "1px solid #999999"}}>
                        <Row className="align-items-center">
                            <Col xs={9}>
                            {
                                failed 
                                ? <Form.Control size="sm" placeholder="Invalid User" value={userId} type="text" onChange={e => setUserId(e.target.value)}  style={{border: "1px solid red", marginLeft: "auto", marginRight: "auto", display: "inline"}}/>
                                : <Form.Control size="sm" placeholder="Enter User ID" value={userId} type="text" onChange={e => setUserId(e.target.value)}  style={{marginLeft: "auto", marginRight: "auto", display: "inline"}}/>
                            }
                            </Col>
                            <Col>
                                <Button variant="primary" size="md" onClick={() => addToGroup()}><span>Add</span></Button>
                            </Col>
                        </Row>
                        <Row className="justify-content-center contentOverflow mt-3">
                            <Col sm="10">
                                {localGroup.map((id) => (
                                    <Card style={{color: "#000"}} key={id} body>User {id}</Card>
                                ))}
                            </Col>
                        </Row>
                    </div>
                    
                    <Link style={{textDecoration: "none"}} to='/Distribute/Questions'>
                        <Button variant="primary" size="sm" className="mt-5"><span className="smButtonText">Next</span></Button>
                    </Link>
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