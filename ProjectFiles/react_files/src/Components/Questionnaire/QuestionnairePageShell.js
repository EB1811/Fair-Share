import React, { useState } from "react";

// React Components
import QuestionnaireQuestion from "./QuestionnaireQuestion";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// React Router
import { useParams, Link } from "react-router-dom";

import shareLocal from "../../Images/meeting-local-group_ICON.svg";
import shareOnlineGroup from "../../Images/share-online-group_ICON.svg";

const QuestionnairePageShell = () => {
    // Information about goods.
    const [questions] = useState([
        { question: "Question 1" },
        { question: "Question 2" },
        { question: "Question 3" },
    ]);
    let { goodsType } = useParams();
    const [stage, setStage] = useState(0);

    if (stage === 0) {
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
                            onClick={() => setStage(1)}
                        >
                            <span className='smButtonText'>Begin</span>
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    } else if (stage === 1) {
        return (
            <Container fluid className='divBlockWithContentTertiary min-vh-100'>
                <Row className='justify-content-center align-items-center min-vh-100'>
                    <Col
                        xs={11}
                        sm={11}
                        md={10}
                        lg={7}
                        xl={5}
                        className='centerCard m-3'
                        style={{ maxWidth: "800px" }}
                    >
                        <Row>
                            <Col xs={12} sm={6} className='my-2'>
                                <img
                                    src={shareLocal}
                                    className='SVGButton'
                                    alt='meeting-local-group_ICON'
                                    onClick={() => setStage(2)}
                                />
                                <p
                                    className='mt-3 text-muted'
                                    style={{ fontSize: "0.9rem" }}
                                >
                                    Share locally, passing your device around to
                                    gather everyone's valuations. No login
                                    needed.
                                </p>
                            </Col>
                            <Col xs={12} sm={6} className='my-2'>
                                <img
                                    src={shareOnlineGroup}
                                    className='SVGButton'
                                    alt='share-online-group_ICON.svg'
                                    onClick={() => setStage(2)}
                                />
                                <p
                                    className='mt-3 text-muted'
                                    style={{ fontSize: "0.9rem" }}
                                >
                                    Share using an online group, having members
                                    login and get invited to your party.
                                </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
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
                            to={`/Distribute/Information/${goodsType}`}
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

export default QuestionnairePageShell;
