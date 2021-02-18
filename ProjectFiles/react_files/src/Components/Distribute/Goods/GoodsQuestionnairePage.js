import React from "react";

// Questions
import LocalOrRemoteQuestion from "../QuestionnaireSubcomponents/LocalOrRemoteQuestion";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// React Router
import { useParams, Redirect } from "react-router-dom";

const GoodsQuestionnairePageShell = (props) => {
    // Stage = question.
    let { stage } = useParams();

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
                                    "/Distribute/Goods/Questions/1"
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
        return <LocalOrRemoteQuestion goodType='Goods' />;
    } else if (stage > 1) {
        return <Redirect to='/Distribute/Goods/GoodInfo' />;
    } else {
        return <Redirect to='/Distribute/Goods/Questions/0' />;
    }
};

export default GoodsQuestionnairePageShell;
