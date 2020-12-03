import React, { useState } from 'react'

// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Redux
import { connect } from 'react-redux';

const CreateAccount = (props) => {
    // Information about goods.
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <Form onSubmit = {handleSubmit}>
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" onChange={e => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="user">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" onChange={e => setUsername(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="pass">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" onChange={e => setPass(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit" size="lg">
                <span className="medButtonText">Create Account</span>
            </Button>
        </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)