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
        <Col xs="12" style={{margin: "2% 0"}}>
            <h1>Short Questionnaire</h1>
        </Col>
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
            <Container fluid style={{height: "100vh", backgroundColor: "#fff"}}>
                <Row className="align-items-center h-100 justify-content-center divBlockWithContentPrimary">
                    <QuestionnaireTitleBlock/>
                    <Row className="justify-content-center w-100 divBlockWithContentSecondary" style={{marginBottom: "12.5%", padding: "4% 0 6% 0"}}>
                        <Col xs={12} sm={4}>
                            <QuestionnaireQuestion stage={stage} setStage={setStage} question={questions[stage].question}/>
                        </Col>
                    </Row>
                </Row>
            </Container>
        )
    } else {
        return (
            <Container fluid className="divBlockWithContentPrimary" style={{height: "100vh"}}>
                <Row className="align-items-center h-100 justify-content-center divBlockWithContentPrimary">
                    <QuestionnaireTitleBlock/>
                    <Row className="justify-content-center w-100 divBlockWithContentSecondary" style={{marginBottom: "12.5%", padding: "4% 0 6% 0"}}>
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