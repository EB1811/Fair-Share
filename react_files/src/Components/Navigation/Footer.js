import React from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Footer = () => {
    return (
        <section>
            <div
                className='d-flex w-100'
                style={{
                    height: "75vh",
                    minHeight: "500px",
                    backgroundColor: "#303030",
                    zIndex: "10",
                }}
            >
                <Container>
                    <Row className='align-items-center h-75 justify-content-center'>
                        <Col style={{ marginTop: "25px" }}>
                            <a style={{ textDecoration: "none" }} href='/'>
                                <h2 className='footerLink'>Home</h2>
                            </a>
                            <a style={{ textDecoration: "none" }} href='/Learn'>
                                <h2 className='footerLink'>Learn</h2>
                            </a>
                            <a
                                style={{ textDecoration: "none" }}
                                href='/Distribute/localremote/Rent'
                            >
                                <h2 className='footerLink'>Distribute Rent</h2>
                            </a>
                            <a
                                style={{ textDecoration: "none" }}
                                href='/Distribute/localremote/Goods'
                            >
                                <h2 className='footerLink'>Distribute Goods</h2>
                            </a>
                            <a
                                style={{ textDecoration: "none" }}
                                href='/Distribute/localremote/Divorce'
                            >
                                <h2 className='footerLink'>
                                    Separate Finances
                                </h2>
                            </a>
                            <br />
                            <a style={{ textDecoration: "none" }} href='/Login'>
                                <h2 className='footerLink'>Login</h2>
                            </a>
                            <a
                                style={{ textDecoration: "none" }}
                                href='/CreateAccount'
                            >
                                <h2 className='footerLink'>Create Account</h2>
                            </a>
                        </Col>
                    </Row>

                    <Row className='align-items-end h-25 justify-content-center'>
                        <Col style={{ marginBottom: "25px" }}>
                            <h2
                                className='footerText'
                                style={{ color: "#fff", fontSize: "12.5px" }}
                            >
                                Icons made by{" "}
                                <a
                                    style={{
                                        textDecoration: "none",
                                        fontSize: "12.5px",
                                    }}
                                    className='footerLink'
                                    href='https://www.flaticon.com/authors/freepik'
                                    title='Freepik'
                                >
                                    Freepik
                                </a>{" "}
                                from{" "}
                                <a
                                    style={{
                                        textDecoration: "none",
                                        fontSize: "12.5px",
                                    }}
                                    className='footerLink'
                                    href='https://www.flaticon.com/'
                                    title='Flaticon'
                                >
                                    www.flaticon.com
                                </a>
                            </h2>
                            <a
                                style={{ textDecoration: "none" }}
                                href='https://eb1811.github.io/'
                            >
                                <h2 className='footerText'>
                                    Website designed and built by Emmanuils
                                    Borovikovs (EB)
                                </h2>
                            </a>
                            {/* <a
                        style={{ textDecoration: "none" }}
                        href='https://github.com/EB1811'
                    >
                        <h2 className='footerLink'>GitHub</h2>
                    </a> */}
                        </Col>
                    </Row>
                </Container>
            </div>
        </section>
    );
};

export default Footer;
