import React, { useState } from "react";

// React Router
import { withRouter } from "react-router-dom";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Redux
import { connect } from "react-redux";

// React Components
import InputValuationsForm from "./InputValuesComponents/InputValuations";

const SetValuationsPage = (props) => {
    // Valuations.
    const [currUser, setCurrUser] = useState(0);

    // Goes to get valuations for next user, if they exist.
    const nextUser = () => {
        // Check if next user exists.
        if (currUser < props.usersArr.length - 1) {
            setCurrUser(currUser + 1);
        } else {
            // Dispatch to get results and redirect to results page.
            props.getAllocation();
            props.history.push("/Results");
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
                            {props.usersArr[currUser].name}, enter your
                            valuation for each item:
                        </h4>
                        <InputValuationsForm
                            currUser={currUser}
                            nextUser={nextUser}
                        />
                    </Col>
                </Row>
            </Container>
        );
    } else {
        return <div>No Users Defined</div>;
    }
};

//* To modify redux store.
const mapStateToProps = (state) => {
    return {
        usersArr: state.distGroupInfo.userArray,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllocation: () => {
            dispatch({ type: "GET_ALLOCATIONS" });
        },
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(SetValuationsPage)
);
