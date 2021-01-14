import React, { useState } from 'react'

// React Components
import InputGoodsInfo from './DistEntryForms/InputGoodsInfo';
import InputGroupInfo from './DistEntryForms/InputGroupInfo';

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Redux
import { connect } from 'react-redux';

const DistributeEntry = (props) => {
    //! Stage determines which section of the goods entry input to render.
    const [stage, setStage] = useState(0);

    //TODO Add title to centerCard.

    switch(stage) {
        case 0:
            return (
                <Container fluid className="vh-100" style={{minHeight: "100vh"}}>
                    <Row className="align-items-center justify-content-center" style={{height: "30%"}}>
                        <Col xs="8">
                            {
                                props.goodType === 'Rent'
                                ? <h1 className="Title2">House Information</h1>
                                : <h1 className="Title2">Goods Information</h1>
                            }
                        </Col>
                    </Row>
                    <Row className="justify-content-center align-items-center">
                        <Col xs={12} sm={3}><InputGoodsInfo goodType={props.goodType} setStage={setStage}/></Col>
                    </Row>
                </Container>
            )
        case 1:
            return (
                <Container fluid className="vh-100"  style={{minHeight: "100vh"}}>
                    <Row className="align-items-center justify-content-center" style={{height: "20%"}}>
                        <Col xs="8">
                            <h1 className="Title2">Add users to group</h1>
                        </Col>
                    </Row>
                    <InputGroupInfo setStage={setStage}/>
                </Container>
            )
        default:
            console.log("Major Error. Please restart application.")
    }
}

// To access and modify redux store.
const mapStateToProps = (state) => {
    return {
        goodsArr: state.distGoodsInfo.goodsArray,
        goodsTotVal: state.distGoodsInfo.totalValue,
        userArr: state.distGroupInfo.userArray
    }
}
export default connect(mapStateToProps)(DistributeEntry);
