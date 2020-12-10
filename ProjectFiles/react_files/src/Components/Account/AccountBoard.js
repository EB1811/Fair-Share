import React, { useState } from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

// Redux
import { connect } from 'react-redux';

const AccountBoard = (props) => {
    const [valArr] = useState([
        { name: "Valuation 1" },
        { name: "Valuation 2" },
        { name: "Valuation 3" },
        { name: "Valuation 4" }
    ]);

    return (
        <Container fluid className="divBlockWithContentPrimary" style={{minHeight: "100vh"}}>
            <Row className= "justify-content-center divBlockWithContentTertiary">
                <Col>
                    <div style={{minWidth: "200px", minHeight: "200px"}}>
                        Image
                    </div>
                </Col>
            </Row>
            <Row className= "justify-content-center divBlockWithContentTertiary">
                <Col>
                    <h6>Account Settings</h6>
                </Col>
            </Row>
            <Row>
                {valArr.map((item) => (
                    <Col key={item.name} xs={12} sm={6} md={4} lg={3} xl={2} className= "justify-content-center">
                        <Card key={item.name} bg='light' text={'dark'} style={{minHeight: "300px", margin: "15px 0"}}>
                            <Card.Header>10/12/20</Card.Header>
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                    {item.name}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        //authStatus: state.firebase.auth,
        //authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountBoard)