import React, { useState } from 'react'

// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Redux
import { connect } from 'react-redux';

const Login = (props) => {
    // Information about goods.
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <Container fluid style={{height: "100vh"}}>
            <Row className="align-items-center h-100 justify-content-sm-center divBlockWithContentPrimary">
            <Col xs={12} sm={5}>
                <Form onSubmit = {handleSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="pass">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="text" onChange={e => setPass(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" size="lg">
                        <span className="medButtonText">Login</span>
                    </Button>
                </Form>
            </Col>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)