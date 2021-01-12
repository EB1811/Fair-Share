import React from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Own Components
import DistributeEntry from './DistributeEntry';

const DistributeRentPage = () => {
    return (
        <Container fluid style={{height: "auto", minHeight: "100vh", padding: "0"}} className="divBlockWithContentTertiary">
                <DistributeEntry goodType={"Rent"}/>
        </Container>
    )
}

export default DistributeRentPage;
