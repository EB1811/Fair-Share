import React from "react";

// React Components
import InputGoodsInfo from "./InputGoodsInfo";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Redux
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";

const Goods_GatherInfoPage = (props) => {
    // Go to add users to group.
    const next = () => {
        console.log(props.shareMethod);
        props.history.push(`/Distribute/GroupInfo/${props.shareMethod}/Goods`);
    };

    //? Maybe have a variable in questions showing if all questions completed.
    if (props.shareMethod) {
        return (
            <Container fluid className='divBlockWithContentTertiary min-vh-100'>
                <Row className='justify-content-center align-items-center min-vh-100'>
                    <Col
                        xs={10}
                        sm={8}
                        md={6}
                        lg={5}
                        xl={3}
                        className='centerCardCompact m-3'
                        style={{ maxWidth: "510px" }}
                    >
                        <InputGoodsInfo next={next} />
                    </Col>
                </Row>
            </Container>
        );
    } else {
        return <Redirect to='/Distribute/Goods/Questions/0' />;
    }
};

// To access and modify redux store.
const mapStateToProps = (state) => {
    return {
        goodsArr: state.distGoodsInfo.goodsArray,
        goodsTotVal: state.distGoodsInfo.totalValue,
        userArr: state.distGroupInfo.userArray,
        shareMethod: state.questionnaireAnswers.shareMethod,
    };
};
export default connect(mapStateToProps)(Goods_GatherInfoPage);