import React, { useState } from 'react'

// React Components
import InputGoodsInfo from './DistEntryForms/InputGoodsInfo';
import InputGroupInfo from './DistEntryForms/InputGroupInfo';

// Bootstrap Components
import Container from 'react-bootstrap/Container';
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
                <Container fluid className="divBlockWithContentTertiary min-vh-100">
                    <Row className="justify-content-center align-items-center min-vh-100">
                        <Col xs={12} sm={3} className="centerCard m-3">
                            <InputGoodsInfo goodType={props.goodType} setStage={setStage}/>
                        </Col>
                    </Row>
                </Container>
            )
        case 1:
            return (
                <InputGroupInfo setStage={setStage}/>
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
