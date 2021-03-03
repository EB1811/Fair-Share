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

const ResultsPage = ({
    userArray,
    stateAllocation,
    setStateAllocation,
    goodsArray,
    totalCost,
}) => {
    let { goodType } = useParams();
    // Get results.
    useEffect(() => {
        if (userArray.length > 0 && goodsArray.length > 0) {
            //* API accepts JSON format with a matrix representing each user as a row, and each good as a column. Row, Column = user valuation.
            /*
            e.g.,
            {
                "valueMatrix": 
                [ 
                    [500, 100, 700, 1], 
                    [1000, 200, 800, 5], 
                    [100, 500, 1000, 100]
                ]
            }
            */

            // First convert valuations in user array into a format compatible with API (see above).
            const userCount = userArray.length;
            const goodsCount = userArray[0].userGoodsArr.length;
            var valueMatrix = Array.from(
                Array(userCount),
                () => new Array(goodsCount)
            );
            for (var i = 0; i < userCount; i++) {
                for (var j = 0; j < goodsCount; j++) {
                    valueMatrix[i][j] = userArray[i].userGoodsArr[j].Value;
                }
            }

            // Connect to API.
            const tempAlloArray = [];
            // Goods or Rooms route.
            //TODO: [A301212-93] Have two different result routes instead of doing it like this.
            if (goodType === "Rent") {
                const fetchURL = "http://localhost:5000/api/getRoomsAllocation";
                const requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Origin: "http://localhost:3000",
                    },
                    body: JSON.stringify({
                        valueMatrix: valueMatrix,
                        totalCost: totalCost,
                    }),
                };

                fetch(fetchURL, requestOptions)
                    .then((res) => res.json())
                    .then((data) => {
                        data.map((user) =>
                            tempAlloArray.push({
                                userEmail: userArray[user.who].userEmail
                                    ? userArray[user.who].userEmail
                                    : null,
                                username: userArray[user.who].username,
                                room: user.room,
                                price: user.price,
                            })
                        );

                        setStateAllocation(tempAlloArray);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else if (goodType === "Goods") {
                const fetchURL = "http://localhost:5000/api/getGoodsAllocation";
                const requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Origin: "http://localhost:3000",
                    },
                    body: JSON.stringify({
                        valueMatrix: valueMatrix,
                    }),
                };

                fetch(fetchURL, requestOptions)
                    .then((res) => res.json())
                    .then((data) => {
                        data.map((user) =>
                            tempAlloArray.push({
                                userEmail: userArray[user.who].userEmail
                                    ? userArray[user.who].userEmail
                                    : null,
                                username: userArray[user.who].username,
                                alloGoods: user.goodsList,
                            })
                        );

                        setStateAllocation(tempAlloArray);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    }, [setStateAllocation, userArray, goodsArray, goodType, totalCost]);

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

// To access and modify redux store.
const mapStateToProps = (state) => {
    return {
        stateAllocation: state.distGroupInfo.allocations,
        userArray: state.distGroupInfo.userArray,
        goodsArray: state.distGoodsInfo.goodsArray,
        totalCost: state.distGoodsInfo.totalValue,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setStateAllocation: (allocationArr) => {
            dispatch({ type: "SET_ALLOCATIONS", allocationArr: allocationArr });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsPage);
