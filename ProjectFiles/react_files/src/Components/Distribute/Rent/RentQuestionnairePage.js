import React, { useState } from "react";

// Questions
import LocalOrRemoteQuestion from "../QuestionnaireSubcomponents/LocalOrRemoteQuestion";
import QuestionnaireQuestion from "../QuestionnaireSubcomponents/QuestionnaireQuestion";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// React Router
import { useParams, Link } from "react-router-dom";

const RentQuestionnairePageShell = (props) => {
    // Information about goods.
    const [questions] = useState([
        { question: "Question 1" },
        { question: "Question 2" },
        { question: "Question 3" },
    ]);
    // Stage = question.
    let { stage } = useParams();

    // Go to next question.
    const setStage = (stage) => {
        props.history.push(`/Distribute/Rent/Questions/${stage}`);
    };

    if (stage === "0") {
        return (
            <Container fluid className='divBlockWithContentTertiary min-vh-100'>
                <Row className='justify-content-center align-items-center min-vh-100'>
                    <Col
                        xs={10}
                        sm={7}
                        md={5}
                        lg={4}
                        xl={3}
                        className='centerCard m-3'
                        style={{ maxWidth: "510px" }}
                    >
                        <h6>
                            Please complete the following short questionnaire.
                            <br />
                            <br />
                            Answers to these questions will determine what
                            qualities the allocation algorithm will have.
                        </h6>
                        <Button
                            variant='primary'
                            size='sm'
                            className='mt-5'
                            onClick={() =>
                                props.history.push(
                                    "/Distribute/Rent/Questions/1"
                                )
                            }
                        >
                            <span className='smButtonText'>Begin</span>
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    } else if (stage === "1") {
        return <LocalOrRemoteQuestion goodType='Rent' />;
    } else if (stage > 1 && stage < 4) {
        return (
            <Container fluid className='divBlockWithContentTertiary min-vh-100'>
                <Row className='justify-content-center align-items-center min-vh-100'>
                    <Col
                        xs={10}
                        sm={7}
                        md={5}
                        lg={4}
                        xl={3}
                        className='centerCard m-3'
                        style={{ maxWidth: "510px" }}
                    >
                        <QuestionnaireQuestion
                            stage={stage}
                            setStage={setStage}
                            question={questions[stage - 1].question}
                        />
                    </Col>
                </Row>
            </Container>
        );
    } else {
        //TODO End process from a method checking stage, instead of having a page with a CTA to leave page.
        return (
            <Container fluid className='divBlockWithContentTertiary min-vh-100'>
                <Row className='justify-content-center align-items-center min-vh-100'>
                    <Col
                        xs={10}
                        sm={7}
                        md={5}
                        lg={4}
                        xl={3}
                        className='centerCard m-3'
                        style={{ maxWidth: "510px" }}
                    >
                        <Link
                            style={{ textDecoration: "none" }}
                            to={"/Distribute/Rent/GoodInfo/"}
                        >
                            <Button variant='primary' size='sm'>
                                <span className='smButtonText'>
                                    Begin Valuing Items
                                </span>
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        );
    }
};

export default RentQuestionnairePageShell;
