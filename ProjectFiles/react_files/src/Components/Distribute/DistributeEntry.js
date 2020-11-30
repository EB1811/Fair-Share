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
                    <Row className="justify-content-sm-center">
                        <Col xs={12} sm={5}><InputGoodsInfo setStage={setStage}/></Col>
                    </Row>
                </Container>
            )
        case 1:
            return (
                <InputGroupInfo setStage={setStage}/>
            )
        case 2:
            return (
                <Container fluid>
                    <Row className="justify-content-sm-center">
                        <Col >
                            <h2>Number of {props.goodType}: {props.temp.length}</h2>
                        </Col>
                        
                    </Row>
                    <Row className="justify-content-sm-center">
                        <Col>
                            <h2>Total value of {props.goodType}: </h2>
                        </Col>
                    </Row>
                    <Row className="justify-content-sm-center">
                        <Col>
                            <h2>Users: </h2>
                        </Col>
                    </Row>
                    <Row className="justify-content-sm-center">
                        <Col xs={12} sm={4} md={3} lg={2}>
                            <Link style={{textDecoration: "none"}} to='/Distribute/Valuations'>
                                <Button variant="primary" size="lg" block style={{borderColor: '#ffffff'}}>
                                    <span className="medButtonText">Next</span>
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            )
    }
}

// To access and modify redux store.
const mapStateToProps = (state) => {
    console.log(state)
    return {
        temp: state.distGoodsInfo.temp2
    }
}
export default connect(mapStateToProps)(DistributeEntry);
