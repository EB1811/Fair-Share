import React, { useState } from 'react'

// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

// Redux
import { connect } from 'react-redux';

const InputGoodsInfo = (props) => {
    // Goods Name.
    const [goodName, setGoodName] = useState("");
    // Local group for rendering.
    const [localGoods, setLocalGoods] = useState([]);
    // Failed bool used for conditional css.
    const [failed, setFailed] = useState(false);

    //* Add good to state and store..
    const addGood = () => {
        if(localGoods.includes(goodName)) {
            setFailed(true);
            setGoodName("");
        } else {
            //props.addUser(userId);
            setLocalGoods(localGoods.concat(goodName));
            setGoodName("");
            setFailed(false);
        }
    }
    // Next state.
    const nextState = () => {
        props.setStage(1);
    }

    return (
        <div>
        <h5 className="descText">Please input the good's name and price.</h5>
        <div className="mt-5 py-2" style={{borderTop: "1px solid #999999", borderBottom: "1px solid #999999"}}>
            <Row className="align-items-center">
                <Col xs={9}>
                {
                    failed 
                    ? <Form.Control size="sm" placeholder="Invalid User" value={goodName} type="text" onChange={e => setGoodName(e.target.value)}  style={{border: "1px solid red", marginLeft: "auto", marginRight: "auto", display: "inline"}}/>
                    : <Form.Control size="sm" placeholder="Enter User ID" value={goodName} type="text" onChange={e => setGoodName(e.target.value)}  style={{marginLeft: "auto", marginRight: "auto", display: "inline"}}/>
                }
                </Col>
                <Col>
                    <Button variant="primary" size="md" onClick={() => addGood()}><span>Add</span></Button>
                </Col>
            </Row>
            <Row className="justify-content-center contentOverflow mt-3">
                <Col sm="10">
                    {localGoods.map((id) => (
                        <Card style={{color: "#000"}} key={id} body>{id}</Card>
                    ))}
                </Col>
            </Row>
        </div>
        
        
        <Button variant="primary" size="sm" className="mt-5" onClick={nextState}><span className="smButtonText">Next</span></Button>
        </div>
 )
}

export default InputGoodsInfo;