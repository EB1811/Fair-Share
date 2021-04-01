import React from "react";

// Bootstrap Components
import Alert from "react-bootstrap/Alert";

const ErrorAlertModal = ({ errorMessage }) => {
    return errorMessage ? (
        <Alert variant={"danger"}>{errorMessage}</Alert>
    ) : null;
};

export default ErrorAlertModal;
