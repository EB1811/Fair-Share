import React, { useState } from 'react'

// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Redux
import { connect } from 'react-redux';

const QuestionnaireQuestion = (props) => {
    const [answer, setAnswer] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        props.addAnswer(props.question, answer);
        setAnswer("");
        props.setStage(props.stage + 1);
    }

    return (
        <Form onSubmit = {handleSubmit}>
            <Form.Group controlId="question">
                <Form.Label><h1>{ props.question }</h1></Form.Label>
                <Form.Control type="text" value={answer} onChange={e => setAnswer(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit" size="lg">
                <span className="medButtonText">Next</span>
            </Button>
        </Form>
    )
}

const mapStateToProps = (state) => {
    return {
        answer: state.distQuestionsInfo.userValues
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAnswer: (question, answer) => { dispatch({type: question, ans: answer}) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireQuestion)