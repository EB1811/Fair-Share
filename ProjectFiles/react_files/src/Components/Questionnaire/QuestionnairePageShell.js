import React, { useState } from 'react'

// React Components
import QuestionnaireQuestion from './QuestionnaireQuestion';

// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Redux
import { connect } from 'react-redux';

const QuestionnairePageShell = (props) => {
    // Information about goods.
    const [questions, setQuestions] = useState([
        {question: "Question 1"},
        {question: "Question 2"},
        {question: "Question 3"}
    ]);
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <Container fluid style={{height: "100vh"}}>
            <Row className="align-items-center h-100 justify-content-sm-center">
                <Col xs={12} sm={5}>
                    <QuestionnaireQuestion question={questions[0]}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnairePageShell)