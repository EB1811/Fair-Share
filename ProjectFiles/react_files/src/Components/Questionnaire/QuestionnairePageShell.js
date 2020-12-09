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

const QuestionnaireTitleBlock = () => {
    return (
        <Row className="align-items-center" xs="12" style={{margin: "100px"}}>
            <h1 className="Title2">Short Questionnaire</h1>
        </Row>
    )
}

const QuestionnairePageShell = (props) => {
    // Information about goods.
    const [questions, setQuestions] = useState([
        {question: "Question 1"},
        {question: "Question 2"},
        {question: "Question 3"}
    ]);
    const [stage, setStage] = useState(0);

    if(stage < 3) {
        return (
            <Container fluid className="h-100 divBlockWithContentPrimary">
                <Row className="h-100 justify-content-center">
                    <Row className="w-100 divBlockWithContentPrimary justify-content-center" style={{marginBottom: "12.5%", padding: "4% 0 6% 0"}}>
                        <QuestionnaireTitleBlock/>
                        <Row className=" justify-content-center w-100" style={{}}>
                            <Col xs={12} sm={4}>
                                <QuestionnaireQuestion stage={stage} setStage={setStage} question={questions[stage].question}/>
                            </Col>
                        </Row>
                    </Row>
                </Row>
            </Container>
        )
    } else {
        return (
            <Container fluid className="divBlockWithContentPrimary" style={{height: "100vh"}}>
                <Row className="align-items-center h-100 justify-content-center">
                    <Row className="justify-content-center w-100">
                        <Col xs={12} sm={4}>
                            <Link style={{textDecoration: "none"}} to='/Distribute/Valuations'>
                                <Button variant="primary" size="lg">
                                    <span className="medButtonText">Begin Valuing Rooms</span>
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Row>
            </Container>
        )
    }

    
}

export default QuestionnairePageShell