import React, { useState, useEffect } from "react";

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

const InputGroupInfo = ({
    setStage,
    profile,
    stateUserArray,
    stateGoodsArr,
    addUser,
    history,
}) => {
    // User ID.
    const [userEmail, setUserEmail] = useState("");
    // Failed bool for conditional rendering failure state.
    const [userIdFailed, setUserIdFailed] = useState(false);
    const [groupCountFailed, setGroupCountFailed] = useState(false);

    // Add initial user (the user who is on the page) on page load.
    useEffect(() => {
        if (profile.isLoaded) {
            addUser(profile.email, profile.username, stateGoodsArr);
        }
    }, [profile, stateGoodsArr, addUser]);

    // Update number of users on submit.
    const addToGroup = () => {
        if (stateUserArray.some((obj) => obj.name === userEmail)) {
            setUserIdFailed(true);
            setUserEmail("");
        } else {
            addUser(userEmail, "temp username", stateGoodsArr);
            setUserEmail("");
            setUserIdFailed(false);
        }
    };
    // Validate group then continue to next page.
    const checkGroup = () => {
        if (stateUserArray.length < 2) {
            setGroupCountFailed(true);
        } else {
            setGroupCountFailed(false);
            history.push("/Distribute/Questions");
        }
    };
    const prevStage = () => {
        setStage(0);
    };

    return (
        <Container fluid className='divBlockWithContentTertiary min-vh-100'>
            <Row className='justify-content-center align-items-center min-vh-100'>
                <Col
                    xs={10}
                    sm={8}
                    md={6}
                    lg={5}
                    xl={3}
                    className='centerCardCompact m-3'
                    style={{ maxWidth: "650px" }}
                >
                    <h5>Enter a user email to add them to the group.</h5>
                    <div
                        className='mt-4 py-2'
                        style={{
                            borderTop: "1px solid #999999",
                            borderBottom: "1px solid #999999",
                        }}
                    >
                        <Row className='align-items-center'>
                            <Col xs={8} sm={9}>
                                <Form.Control
                                    size='sm'
                                    placeholder={
                                        userIdFailed
                                            ? "Invalid User"
                                            : "Enter User email"
                                    }
                                    value={userEmail}
                                    type='email'
                                    onChange={(e) =>
                                        setUserEmail(e.target.value)
                                    }
                                    style={
                                        userIdFailed
                                            ? { border: "1px solid red" }
                                            : {}
                                    }
                                />
                            </Col>
                            <Col xs={4} sm={3}>
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
                                {stateUserArray.map((user) => (
                                    <Card
                                        style={{ color: "#000" }}
                                        key={user.userEmail}
                                        body
                                    >
                                        {user.username}
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
                            onClick={prevStage}
                            className='mr-2'
                        >
                            <span className='smButtonText'>Previous</span>
                        </Button>
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
        profile: state.firebase.profile,
        stateUserArray: state.distGroupInfo.userArray,
        stateGoodsArr: state.distGoodsInfo.goodsArray,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (userEmail, username, goodsArr) => {
            dispatch({
                type: "ADD_USER",
                email: userEmail,
                username: username,
                goods: goodsArr,
            });
        },
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(InputGroupInfo)
);
