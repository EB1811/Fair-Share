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
import { compose } from "redux";
import { connect } from "react-redux";
// rrf
import { firestoreConnect } from "react-redux-firebase";

// React Router
import { withRouter } from "react-router-dom";

const InputGroupInfo = ({
    profile,
    firebaseUsers,
    stateUserArray,
    stateGoodsArr,
    addUser,
    removeUser,
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
        const user = firebaseUsers.filter((user) => user.email === userEmail);
        if (
            firebaseUsers &&
            !stateUserArray.some((obj) => obj.userEmail === userEmail) &&
            user.length > 0
        ) {
            addUser(user[0].email, user[0].username, stateGoodsArr);
            setUserEmail("");
            setUserIdFailed(false);
        } else {
            setUserIdFailed(true);
            setUserEmail("");
        }
    };
    // Validate group then continue to next page.
    const checkGroup = () => {
        if (stateUserArray.length < 2) {
            setGroupCountFailed(true);
        } else {
            setGroupCountFailed(false);
            history.push("/Distribute/Valuations");
        }
    };
    const deleteUser = (userEmail) => {
        if (userEmail !== profile.email) {
            removeUser(userEmail);
        }
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
                                        style={{
                                            color: "#000",
                                            textAlign: "left",
                                        }}
                                        key={user.userEmail}
                                        body
                                    >
                                        {user.username}
                                        {user.userEmail !== profile.email ? (
                                            <button
                                                className='close'
                                                onClick={() =>
                                                    deleteUser(user.userEmail)
                                                }
                                            >
                                                ×
                                            </button>
                                        ) : (
                                            <button className='close'></button>
                                        )}
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
        profile: state.firebase.profile,
        firebaseUsers: state.firestore.ordered.users,
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
        removeUser: (userEmail) => {
            dispatch({
                type: "DELETE_USER",
                userEmail: userEmail,
            });
        },
    };
};

export default withRouter(
    compose(
        firestoreConnect(() => ["users"]),
        connect(mapStateToProps, mapDispatchToProps)
    )(InputGroupInfo)
);
