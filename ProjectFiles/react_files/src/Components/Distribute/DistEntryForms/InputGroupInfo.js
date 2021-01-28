import React, { useState } from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

// Redux
import { connect } from "react-redux";

// React Router
import { withRouter } from "react-router-dom";

const InputGroupInfo = (props) => {
    // User ID.
    const [userId, setUserId] = useState("");
    // Local group for rendering.
    const [localGroup, setLocalGroup] = useState([]);
    // Failed bool for conditional rendering failure state.
    const [userIdFailed, setUserIdFailed] = useState(false);
    const [groupCountFailed, setGroupCountFailed] = useState(false);

    // Update number of users on submit.
    const addToGroup = () => {
        //! This will be changed to looking to see if user id exists in database.
        if (props.group.includes(userId)) {
            setUserIdFailed(true);
            setUserId("");
        } else {
            props.addUser(userId);
            setLocalGroup(localGroup.concat(userId));
            setUserId("");
            setUserIdFailed(false);
        }
    };
    // Validate group then continue to next page.
    const checkGroup = () => {
        if (props.group.length < 2) {
            setGroupCountFailed(true);
        } else {
            setGroupCountFailed(false);
            props.history.push("/Distribute/Questions");
        }
    };

    return (
        <Container fluid className='divBlockWithContentTertiary min-vh-100'>
            <Row className='justify-content-center align-items-center min-vh-100'>
                <Col xs={12} sm={3} className='centerCardCompact m-3'>
                    <h5 className='descText'>
                        Please input a user id to add them to the group.
                    </h5>
                    <div
                        className='mt-4 py-2'
                        style={{
                            borderTop: "1px solid #999999",
                            borderBottom: "1px solid #999999",
                        }}
                    >
                        <Row className='align-items-center'>
                            <Col xs={9}>
                                <Form.Control
                                    size='sm'
                                    placeholder={
                                        userIdFailed
                                            ? "Invalid User"
                                            : "Enter User ID"
                                    }
                                    value={userId}
                                    type='text'
                                    onChange={(e) => setUserId(e.target.value)}
                                    style={
                                        userIdFailed
                                            ? { border: "1px solid red" }
                                            : {}
                                    }
                                />
                            </Col>
                            <Col>
                                <Button
                                    variant='primary'
                                    size='md'
                                    onClick={() => addToGroup()}
                                >
                                    <span>Add</span>
                                </Button>
                            </Col>
                        </Row>
                        <Row className='justify-content-center contentOverflow mt-3'>
                            <Col sm='10'>
                                {localGroup.map((id) => (
                                    <Card
                                        style={{ color: "#000" }}
                                        key={id}
                                        body
                                    >
                                        User {id}
                                    </Card>
                                ))}
                            </Col>
                        </Row>
                    </div>
                    <div className='mt-4'>
                        {groupCountFailed ? (
                            <Alert variant={"danger"}>
                                Error! Must have at least 2 users.
                            </Alert>
                        ) : null}

                        <Button
                            variant='primary'
                            size='sm'
                            onClick={checkGroup}
                        >
                            <span className='smButtonText'>Next</span>
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

// To access and modify redux store.
const mapStateToProps = (state) => {
    return {
        group: state.distGroupInfo.userArray,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (userId) => {
            dispatch({ type: "ADD_USER", id: userId });
        },
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(InputGroupInfo)
);
