import React, { useState } from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

// Redux
import { connect } from "react-redux";

// React Components
import InputValuationsForm from "./InputValuesComponents/InputValueations";

const DistributeGoodsPage = (props) => {
    // Valuations.
    const [currUser, setCurrUser] = useState(0);
    const [isAllUsersDone, setIsAllUsersDone] = useState(false);

    // Update redux valuations store on submit.
    const handleSubmit = (e) => {
        e.preventDefault();
        ////console.log(localgoodsArr.reduce((sum, {Value}) => sum + parseInt(Value), 0));
        //props.updateGoodsValuations(localgoodsArr);
        //props.history.push("/Results");
    };

    const nextUser = () => {};

    if (props.userArr) {
        if (!allUsersDone) {
            return (
                <Container
                    fluid
                    className='divBlockWithContentTertiary min-vh-100'
                >
                    <Row className='justify-content-center align-items-center min-vh-100'>
                        <Col
                            xs={10}
                            sm={8}
                            md={7}
                            lg={6}
                            className='centerCardCompact m-3'
                            style={{ maxWidth: "800px" }}
                        >
                            <h4>
                                {props.userArr[currUser]}, enter your valuation
                                for each item:
                            </h4>
                            <InputValuationsForm
                                currUser={currUser}
                                nextUser={nextUser}
                            />
                        </Col>
                    </Row>
                </Container>
            );
        } else {
        }
    }
};

//* To access and modify redux store.
const mapStateToProps = (state) => {
    return {
        goodsArr: state.distGoodsInfo.goodsArray,
        tValue: state.distGoodsInfo.totalValue,
        userArr: state.distGroupInfo.userArray,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateGoodsValuations: (arr) => {
            dispatch({ type: "UPDATE_VALUATIONS", updatedArr: arr });
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DistributeGoodsPage);
