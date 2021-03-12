import React from "react";

import InviteToSessionNotificationModal from "./InviteToSessionNotificationModal";
import { withRouter } from "react-router-dom";

import { useFirestoreConnect, useFirestore } from "react-redux-firebase";

import { useSelector } from "react-redux";

const NotificationOverlay = ({ auth, history }) => {
    const firestore = useFirestore();
    useFirestoreConnect([
        { collection: "SessionInvitations", doc: auth.email },
    ]);
    const sessionInvites = useSelector(
        ({ firestore: { data } }) =>
            data.SessionInvitations && data.SessionInvitations[auth.email]
    );

    /*
    useEffect(() => {
        if(sessionInvites) {
            console.log("here")
            const newInvitations = invitations ? [...invitations] : []
            Object.entries(sessionInvites).forEach(([sessionID, info]) => {
                newInvitations.push({sessionID: sessionID, ownerUsername: info.ownerUsername, url: `/Distribute/GroupInfo/Remote/${sessionID}/${info.type}`})
            });

            setInvitations(newInvitations)
        }
    }, [invitations, sessionInvites])
    */

    // Remove invitation from firestore and redirect to session page.
    const joinSession = (sessionID, goodType) => {
        const newInvites = JSON.parse(JSON.stringify(sessionInvites.invites));
        delete newInvites[sessionID];
        firestore
            .update(
                { collection: "SessionInvitations", doc: auth.email },
                { invites: newInvites }
            )
            .then(() => {
                window.location.href = `/Distribute/GroupInfo/Remote/${sessionID}/${goodType}`;
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    const declineSession = (sessionID, goodType) => {
        const newInvites = JSON.parse(JSON.stringify(sessionInvites.invites));
        delete newInvites[sessionID];
        firestore
            .update(
                { collection: "SessionInvitations", doc: auth.email },
                { invites: newInvites }
            )
            .then(() => {
                console.log("Success");
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    //TODO: [A301212-107] Notification styling.

    if (sessionInvites && auth.isLoaded) {
        if (Object.entries(sessionInvites.invites).length > 0) {
            return (
                <div
                    style={{
                        position: "absolute",
                        right: "10px",
                        zIndex: "10",
                    }}
                >
                    {Object.entries(sessionInvites.invites).map((invite) => (
                        <InviteToSessionNotificationModal
                            key={invite[0]}
                            sessionID={invite[0]}
                            info={invite[1]}
                            joinSession={joinSession}
                            declineSession={declineSession}
                        />
                    ))}
                </div>
            );
        } else {
            return null;
        }
    } else {
        return null;
    }
};

export default withRouter(NotificationOverlay);
