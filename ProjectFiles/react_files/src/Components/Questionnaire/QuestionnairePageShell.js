import React, { useState } from 'react'

// React Components
import QuestionnaireQuestion from './QuestionnaireQuestion';

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// React Router
import { Link } from 'react-router-dom';

const QuestionnairePageShell = (props) => {
    // Information about goods.
    const [questions] = useState([
        {question: "Question 1"},
        {question: "Question 2"},
        {question: "Question 3"}
    ]);
    const [stage, setStage] = useState(0);

    if(stage === 0) {
        return (
            <Container fluid className="divBlockWithContentTertiary min-vh-100">
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col xs={12} sm={3} className="centerCard m-3">
                        <h6 className="descText">
                        Please complete the following short questionnaire.<br/><br/>
                        Answers to these questions will determine what qualities the allocation algorithm will have.
                        </h6>
                        <Button variant="primary" size="sm" className="mt-5" onClick={() => setStage(1)}>
                            <span className="smButtonText">Begin</span>
                        </Button>
                    </Col>
                </Row>
            </Container>
        )
    } else if(stage > 0 && stage < 4) {
        return (
            <Container fluid className="divBlockWithContentTertiary min-vh-100">
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col xs={12} sm={3} className="centerCard m-3">
                        <QuestionnaireQuestion stage={stage} setStage={setStage} question={questions[stage - 1].question}/>
                    </Col>
                </Row>
            </Container>
        )
    } else {
        //TODO Add answers from questions. Since its just a page containing a button right now.
        return (
            <Container fluid className="divBlockWithContentTertiary min-vh-100">
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col xs={12} sm={3} className="centerCard m-3">
                        <Link style={{textDecoration: "none"}} to='/Distribute/Valuations'>
                            <Button variant="primary" size="sm">
                                <span className="smButtonText">Begin Valuing Items</span>
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        )
    }

    
}

export default QuestionnairePageShell