import React from "react";

// React Components
import InputRoomsInfo from "../../Local/Rent/InputRoomsInfo";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Redux
import { connect } from "react-redux";

import { Redirect, useParams } from "react-router-dom";

const Rent_Remote_GatherInfoPage = (props) => {
    let { sessionID } = useParams();
    const next = () => {
        props.history.push(`/Distribute/GroupInfo/Remote/Rent`);
    };

    if (props.shareMethod) {
        return (
            <Container fluid className='divBlockWithContentTertiary min-vh-100'>
                <Row className='justify-content-center align-items-center min-vh-100'>
                    <Col
                        xs={10}
                        sm={8}
                        md={6}
                        lg={5}
                        xl={3}
                        className='centerCardCompact m-3'
                        style={{ maxWidth: "510px" }}
                    >
                        <InputRoomsInfo next={next} />
                    </Col>
                </Row>
            </Container>
        );
    } else {
        return <Redirect to='/Distribute/Goods/Questions/0' />;
    }
};
export default connect(Rent_Remote_GatherInfoPage);
