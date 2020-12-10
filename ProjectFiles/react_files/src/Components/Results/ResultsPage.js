import React, { useState, useEffect } from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// React Router
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

const ResultsPage = (props) => {
    // Temp Results data. REDUX
    const [resultsArr, setResultsArr] = useState([]);

    // ALGORITHM GOES IN A FUNCTION CALLED HERE...
    useEffect(
        () => {
            console.log(props.goodsArr);
            console.log(props.userArr);

            //// PLACEHOLDER
            // allocation = good name, user id, price, allocaiton id. 
            var tempArr = [];
            var i;
            var allocation;
            for(i = 0; i < props.goodsArr.length; i++){
                allocation = {good: props.goodsArr[i].Good, user: props.userArr[i], price: (parseInt(props.tValue) / props.goodsArr.length), id: i};
                tempArr.push(allocation);
            }
            setResultsArr(tempArr);
            //// PLACEHOLDER

        }, [props.goodsArr, props.userArr, setResultsArr],
      )

    return (
        <Container fluid style={{height: "100vh"}}>
            <Row className="justify-content-center align-items-center h-100 divBlockWithContentPrimary">
                <Col xs="12" style={{margin: "2% 0"}}>
                    <h1 className="Title">Results</h1>
                </Col>
                <Row className="w-100 justify-content-center" style={{marginBottom: "12.5%", padding: "4% 0 6% 0"}}>
                    <Col sm="6">
                        {resultsArr.map((result) => 
                            <h1 key={result.id}>
                                User with ID {result.user}: {result.good} at £{result.price}
                            </h1>
                        )}
                    </Col>
                </Row>
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
