import React from "react";

// Bootstrap Components
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
                    onClick={() => joinSession(sessionID)}
                >
                    Accept
                </Button>
                <Button
                    variant='danger'
                    size='sm'
                    className='ml-2'
                    onClick={() => declineSession(sessionID)}
                >
                    Decline
                </Button>
            </Toast.Body>
        </Toast>
    );
};

export default InviteToSessionNotificationModal;
