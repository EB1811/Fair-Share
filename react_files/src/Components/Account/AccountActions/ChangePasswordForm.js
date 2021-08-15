import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import { useFirebase } from "react-redux-firebase";

const ChangePasswordForm = (props) => {
    const firebase = useFirebase();

    // Change email.
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password) {
            var user = firebase.auth().currentUser;

            await user.updatePassword(password).catch((err) => {
                console.log(err.message);
                props.setErrorMessage(err.message);
            });

            console.log("Password Changed");
            props.setPassChange(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit} style={{ display: "inline-block" }}>
            <Form.Group controlId='password'>
                <Form.Control
                    type='password'
                    size='sm'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
        </Form>
    );
};

export default ChangePasswordForm;
