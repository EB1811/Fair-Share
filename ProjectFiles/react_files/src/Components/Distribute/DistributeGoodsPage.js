import React from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Own Components
import DistributeEntry from './DistributeEntry';

const DistributeGoodsPage = () => {
    return (
        <Container fluid className="divBlockWithContentTertiary min-vh-100">
            <DistributeEntry goodType={"Goods"}/>
        </Container>
    )
}

export default DistributeGoodsPage;
