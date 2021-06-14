import React, { useState } from "react";

// React Router
import { withRouter, Redirect, useParams } from "react-router-dom";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Redux
import { connect } from "react-redux";

// React Components
import LocalInputValuationsForm from "./LocalInputValuations";

const SetValuationsPage = (props) => {
    let { goodType } = useParams();
    // Valuations.
    const [currUser, setCurrUser] = useState(0);

    // Goes to get valuations for next user, if they exist.
    const nextUser = () => {
        // Check if next user exists.
        if (currUser < props.usersArr.length - 1) {
            setCurrUser(currUser + 1);
        } else {
            // Redirect to results page.
            props.history.push(`/Distribute/Results/Local/${goodType}`);
        }
    };

    if (props.usersArr.length > 0) {
        return (
            <Container fluid className='divBlockWithContentTertiary min-vh-100'>
                <Row className='justify-content-center align-items-center min-vh-100'>
                    <Col
                        xs={10}
                        sm={8}
                        md={7}
                        lg={6}
                        className='centerCardCompact m-3'
                        style={{ maxWidth: "800px" }}
                    >
                        <h4>
                            {props.usersArr[currUser].username}: Enter your
                            valuation for each item:
                        </h4>
                        <LocalInputValuationsForm
                            currUser={currUser}
                            nextUser={nextUser}
                        />
                    </Col>
                </Row>
            </Container>
        );
    } else {
        return <Redirect to={`/Distribute/localremote/${goodType}`} />;
    }
};

//* To modify redux store.
const mapStateToProps = (state) => {
    return {
        usersArr: state.distGroupInfo.userArray,
    };
};

export default withRouter(connect(mapStateToProps)(SetValuationsPage));
