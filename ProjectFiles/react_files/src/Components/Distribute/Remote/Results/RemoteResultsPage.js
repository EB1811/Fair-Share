import React, { useEffect } from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// Redux
import { connect } from "react-redux";

// React Router
import { Redirect, useParams } from "react-router-dom";

const RemoteResultsPage = () => {
    let { goodType } = useParams();
    // Get results.

    if (userArray.length > 0) {
        if (stateAllocation.length > 0) {
            //console.log(stateAllocation);
            return (
                <Container
                    fluid
                    className='divBlockWithContentTertiary min-vh-100'
                >
                    <Row className='justify-content-center align-items-center min-vh-100'>
                        <Col
                            xs={10}
                            sm={8}
                            md={7}
                            lg={6}
                            className='centerCardCompact m-3'
                            style={{ maxWidth: "700px" }}
                        >
                            <h4>Results</h4>
                            <Col sm='12 mt-5'>
                                {stateAllocation.map((allocationObject) => (
                                    <p
                                        key={
                                            allocationObject.userEmail
                                                ? allocationObject.userEmail
                                                : allocationObject.username
                                        }
                                    >
                                        {allocationObject.username}:&nbsp;
                                        {allocationObject.alloGoods ? (
                                            allocationObject.alloGoods.map(
                                                (goodIndex) => (
                                                    <span
                                                        key={
                                                            goodsArray[
                                                                goodIndex
                                                            ].Good
                                                        }
                                                    >
                                                        {
                                                            goodsArray[
                                                                goodIndex
                                                            ].Good
                                                        }
                                                        &nbsp;
                                                    </span>
                                                )
                                            )
                                        ) : (
                                            <span>
                                                {
                                                    goodsArray[
                                                        allocationObject.room
                                                    ].Good
                                                }
                                                &nbsp;at $
                                                {allocationObject.price}
                                                &nbsp;
                                            </span>
                                        )}
                                    </p>
                                ))}
                            </Col>
                            <a href='/' style={{ textDecoration: "none" }}>
                                <Button
                                    variant='primary'
                                    size='sm'
                                    className='mt-5'
                                >
                                    <span className='smButtonText'>
                                        Share Again
                                    </span>
                                </Button>
                            </a>
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            return <div>Loading</div>;
        }
    } else {
        return <Redirect to='/' />;
    }
};

export default RemoteResultsPage;
