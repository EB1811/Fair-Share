import React from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";

const InviteToSessionNotificationModal = ({
    sessionID,
    info,
    joinSession,
    declineSession,
}) => {
    return (
        <Toast>
            <Toast.Header>
                <strong className='mr-auto'>Invitation</strong>
            </Toast.Header>
            <Toast.Body>
                <p className='text-muted' style={{ fontSize: "0.9rem" }}>
                    {info.ownerUsername} has invited you to a share session.
                </p>
                <hr />
                <Button
                    variant='success'
                    size='sm'
                    onClick={() => joinSession(sessionID, info.type)}
                >
                    Accept
                </Button>
                <Button
                    variant='danger'
                    size='sm'
                    className='ml-2'
                    onClick={() => declineSession(sessionID, info.type)}
                >
                    Decline
                </Button>
            </Toast.Body>
        </Toast>
    );
};

export default InviteToSessionNotificationModal;
