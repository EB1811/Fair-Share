import React, { useState } from 'react'

// React Components
import InputGoodsInfo from './DistEntryForms/InputGoodsInfo';
import InputGroupInfo from './DistEntryForms/InputGroupInfo';

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// React Router
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

const DistributeEntry = (props) => {
    // Stage determines which section of the goods entry input to render.
    const [stage, setStage] = useState(0);

    switch(stage) {
        case 0:
            return (
                <Container fluid>
                    <Col xs="12" style={{margin: "100px 0"}}>
                        {
                            props.goodType === 'Rent'
                            ? <h1 className="Title2">House Information</h1>
                            : <h1 className="Title2">Goods Information</h1>
                        }
                    </Col>
                    <Row className="justify-content-center">
                        <Col xs={12} sm={5}><InputGoodsInfo goodType={props.goodType} setStage={setStage}/></Col>
                    </Row>
                </Container>
            )
        case 1:
            return (
                <Container fluid>
                    <Col xs="12" style={{margin: "100px 0"}}>
                        <h1 className="Title2">Add users to group</h1>
                    </Col>
                    <InputGroupInfo setStage={setStage}/>
                </Container>
            )
        case 2:
            return (
                <Container fluid>
                    <Col xs="12" style={{margin: "100px 0"}}>
                        <h1 className="Title2">Confirm</h1>
                    </Col>

                    <Row className="justify-content-center">
                        <Col >
                            {
                                props.goodType === 'Rent'
                                ? <h2>Number of Rooms: {props.goodsArr.length}</h2>
                                : <h2>Number of Goods: {props.goodsArr.length}</h2>
                            }
                        </Col>
                        
                    </Row>
                    <Row className="justify-content-center">
                        <Col>
                            {
                                props.goodType === 'Rent'
                                ? <h2>Total monthly value of House: {props.goodsTotVal}</h2>
                                : <h2>Total value of Goods: {props.goodsTotVal}</h2>
                            }
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col>
                            <h2>Users: </h2>
                            {props.userArr.map((id) => (
                                <span key={id}>User ID: {id},&nbsp;</span>
                            ))}
                        </Col>
                    </Row>
                    <Row className="justify-content-center" style={{margin: "15px 0"}}>
                            <Link style={{textDecoration: "none"}} to='/Distribute/Questions'>
                                <Button variant="primary" size="lg" block style={{borderColor: '#ffffff'}}>
                                    <span className="medButtonText">Next</span>
                                </Button>
                            </Link>
                    </Row>
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
