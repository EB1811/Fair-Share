import React from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";

// Own Components
import DistributeEntry from "./DistributeEntry";

const DistributeGoodsPage = () => {
    return (
        <Container fluid className='divBlockWithContentTertiary min-vh-100'>
            <DistributeEntry goodType={"Goods"} />
        </Container>
    );
};

export default DistributeGoodsPage;
