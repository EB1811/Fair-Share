import React from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';

// Own Components
import DistributeEntry from './DistributeEntry';

const DistributeGoodsPage = () => {
    return (
        <Container fluid>
            <h1 className="Title">
                Distribute Goods Page
            </h1>
            <DistributeEntry goodType={"Goods"}/>
        </Container>
    )
}

export default DistributeGoodsPage;
