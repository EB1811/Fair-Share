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
                <strong className='mx-auto'>Share Invitation</strong>
            </Toast.Header>
            <Toast.Body>
                <p
                    className='text-muted mx-auto'
                    style={{ fontSize: "0.9rem" }}
                >
                    {info.ownerUsername} has invited you to a share session.
                </p>
                <Button
                    variant='outline-success'
                    size='sm'
                    onClick={() => joinSession(sessionID)}
                    data-testid='accept_invitation'
                >
                    Accept
                </Button>
                <Button
                    variant='outline-danger'
                    size='sm'
                    className='ml-2'
                    onClick={() => declineSession(sessionID)}
                    data-testid='decline_invitation'
                >
                    Decline
                </Button>
            </Toast.Body>
        </Toast>
    );
};

export default InviteToSessionNotificationModal;
