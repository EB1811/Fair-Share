import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import { useFirebase } from "react-redux-firebase";

const ChangeUsernameForm = (props) => {
    const firebase = useFirebase();

    // Change email.
    const [username, setUsername] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username) {
            firebase
                .updateProfile({ username: username })
                .then(async () => {
                    const user = firebase.auth().currentUser;
                    try {
                        await user.updateProfile({
                            displayName: username,
                        });
                    } catch (err) {
                        props.setErrorMessage(err.message);
                    }
                })
                .then(() => {
                    console.log("Username Updated");
                    props.setUsernameChange(false);
                })
                .catch((err) => {
                    console.log(err.message);
                    props.setErrorMessage(err.message);
                });
        }
    };

    return (
        <Form onSubmit={handleSubmit} style={{ display: "inline-block" }}>
            <Form.Group controlId='username'>
                <Form.Control
                    type='text'
                    size='sm'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>
        </Form>
    );
};

export default ChangeUsernameForm;
