import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import { useFirebase } from "react-redux-firebase";

const ChangeEmailForm = (props) => {
    const firebase = useFirebase();

    // Change email.
    const [email, setEmail] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            firebase
                .updateEmail(email, true)
                .then(() => {
                    console.log("Email Updated");
                    props.setEmailChange(false);
                })
                .catch((err) => {
                    console.log(err.message);
                    props.setErrorMessage(err.message);
                });
        }
    };
    //! If the user clicks the email link asking to revert email change, profile and auth emails are out of sync, i.e., profile email is not reverted.
    //! Known issue with react-redux-firebase: https://github.com/prescottprue/react-redux-firebase/issues/859

    return (
        <Form onSubmit={handleSubmit} style={{ display: "inline-block" }}>
            <Form.Group controlId='email'>
                <Form.Control
                    type='email'
                    size='sm'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
        </Form>
    );
};

export default ChangeEmailForm;
