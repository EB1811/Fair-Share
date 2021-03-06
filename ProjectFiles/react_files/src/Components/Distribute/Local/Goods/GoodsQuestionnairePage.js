import React from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// Redux
import { connect } from "react-redux";

// React Router
import { useParams, Redirect } from "react-router-dom";

const GoodsQuestionnairePageShell = (props) => {
    // Stage = question.
    let { stage } = useParams();

    if (props.shareMethod && stage === "0") {
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
                                    "/Distribute/Questions/Local/Goods/1"
                                )
                            }
                        >
                            <span className='smButtonText'>Begin</span>
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    } else if (props.shareMethod && stage === "1") {
        return <Redirect to='/Distribute/GoodInfo/Local/Goods' />;
    } else if (props.shareMethod) {
        return <Redirect to='/Distribute/Questions/Local/Goods/0' />;
    } else {
        return <Redirect to='/Distribute/localremote/Goods' />;
    }
};

// To access and modify redux store.
const mapStateToProps = (state) => {
    return {
        shareMethod: state.questionnaireAnswers.shareMethod,
    };
};

export default connect(mapStateToProps)(GoodsQuestionnairePageShell);
