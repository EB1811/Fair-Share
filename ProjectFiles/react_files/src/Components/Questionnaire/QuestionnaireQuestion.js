import React, { useState } from 'react'

// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Redux
import { connect } from 'react-redux';

const QuestionnaireQuestion = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <Container fluid style={{height: "100vh"}}>
            <Row className="align-items-center h-100 justify-content-sm-center">
                <Col xs={12} sm={5}>
                    hi
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        //authStatus: state.firebase.auth,
        //authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireQuestion)