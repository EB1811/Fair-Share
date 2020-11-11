import React from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';

// Own Components
import DistributeEntry from './DistributeEntry';

const DistributeRentPage = () => {
    return (
        <Container fluid>
            <h1 className="Title">
                Distribute Rent Page
            </h1>
            <DistributeEntry goodType={"Rent"}/>
        </Container>
    )
}

export default DistributeRentPage;
