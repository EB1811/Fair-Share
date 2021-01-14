import React, { useState, useEffect } from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

// Redux
import { connect } from 'react-redux';

// React Router
import { Link } from 'react-router-dom';

const ResultsPage = (props) => {
    const [resultsArr, setResultsArr] = useState([]);

    //! ALGORITHM GOES IN A FUNCTION CALLED HERE...
    useEffect(
        () => {
            //! PLACEHOLDER
            //* allocation = good name, user id, price, allocaiton id. 
            var tempArr = [];
            var i;
            var allocation;
            if(props.goodsArr.length <= props.userArr.length) {
                for(i = 0; i < props.goodsArr.length; i++){
                    allocation = {good: props.goodsArr[i].Good, user: props.userArr[i], price: (parseInt(props.tValue) / props.goodsArr.length), id: i};
                    tempArr.push(allocation);
                }
            } else {
                console.log("Not enough users");
            }
            setResultsArr(tempArr);
            //! PLACEHOLDER

        }, [props.goodsArr, props.userArr, props.tValue, setResultsArr],
      )

    return (
        <Container fluid className="divBlockWithContentTertiary min-vh-100">
            <Row className="justify-content-center align-items-center min-vh-100">
                <Col xs={12} sm={3} className="centerCard m-3">
                    <h4>Results</h4>
                    <Col sm="12 mt-5">
                        {resultsArr.map((result) => 
                            <p key={result.id}>
                                User with ID {result.user}: {result.good} at £{result.price}
                            </p>
                        )}
                    </Col>
                    <Link style={{textDecoration: "none"}} to='/Distribute'>
                        <Button variant="primary" size="md" className="mt-5">
                            <span className="smButtonText">Share Again</span>
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}

// To access and modify redux store.
const mapStateToProps = (state) => {
    return {
        goodsArr: state.distGoodsInfo.goodsArray,
        userArr: state.distGroupInfo.userArray,
        tValue: state.distGoodsInfo.totalValue
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsPage);
