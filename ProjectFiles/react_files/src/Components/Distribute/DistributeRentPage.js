import React from 'react'

// Bootstrap Components
import Container from 'react-bootstrap/Container';

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
