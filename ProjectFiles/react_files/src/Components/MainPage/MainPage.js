import React, { useRef } from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Icons
import logo1 from "../../Images/fair_ICON.svg";
import logo2 from "../../Images/team_ICON.svg";
import logo3 from "../../Images/check_ICON.svg";
import logo4 from "../../Images/house_ICON.svg";
import logo5 from "../../Images/jewelry_ICON.svg";
import logo6 from "../../Images/divorce-assets-finance_ICON.svg";
import logoStep1 from "../../Images/Information-Entry-step1_ICON.svg";
import logoStep2 from "../../Images/Questions-step2_ICON.svg";
import logoStep3 from "../../Images/Values-step3_ICON.svg";
import logoStep4 from "../../Images/Allocation-step4_ICON.svg";

import titleImage from "../../Images/group-selfie-happy-fair.svg";

// React Router
import { Link } from "react-router-dom";

//// Button to scroll to 'we can help' section.
//// Rework Distribute main page. Maybe have a single goods page with parameters from URL determining what to output.
//// Rework distribute pages by creating seperate components for rent share and goods share. Maybe adding another component for 'seperate finances'.
//// Typography changes to other pages.
//// Delete distribution main page.
//TODO Check if 'seperate finances' need its own distribution component (probably for add users (since only 2 users)).
//// Update navbar: add all types of distributions links (rent, goods, finances), add brand logo, move to left. Make links active when user is on the page corresponding to that link.
//// Conditional rendering failure state in inputting group and house info.
//TODO Start building learning page and add information about it into main page.
//TODO Start authentication process.
//// Responsiveness.
//// Back button to distribution process.
//// Connect to test web api, sending json, and getting parsing the returned json.
//TODO User group should be populated by the user who creates the session.
//TODO Question asking if user wants to input valuations locally or by adding users to sessions.
//TODO Make results page parse data from API.
//TODO Update to react 4.

//? Some goods having an estimated value while others not messes up total value calculations. Maybe make total value calc only include goods with estimated values if some goods has an estimate.
//? Questionnaire at the start, or some way of being able to add user without user id, for local shares.

const MainPage = () => {
    // Scrolling.
    const goodsDesc = useRef(null);
    const executeScroll = () =>
        goodsDesc.current.scrollIntoView({ behavior: "smooth" });

    return (
        <Container fluid className='min-vh-100'>
            <Row
                className='justify-content-center align-items-center divBlockWithContentTitle p-3 backTitleImage'
                style={{ minHeight: "40vh", textAlign: "left" }}
            >
                <Col xs='12' md='6' lg='5'>
                    <h1 className='Title w-100'>Fair / Share</h1>
                    <h5 className='descText mt-2'>
                        Our service helps you solve day-to-day sharing problems
                        using mathmatical algorithms that are tailored to you.
                        <br />
                        Sharing a house with friends? Need to divide financial
                        assets fairly?
                        <br />
                        We can help.
                    </h5>
                    <div className='w-100 mt-5'>
                        <Button
                            variant='secondary'
                            size='sm'
                            onClick={executeScroll}
                        >
                            <span className='smButtonText'>Begin</span>
                        </Button>
                        <Link
                            className='m-2'
                            style={{ textDecoration: "none" }}
                            to='/Learn'
                        >
                            <Button variant='secondary' size='sm'>
                                <span className='smButtonText'>Learn</span>
                            </Button>
                        </Link>
                    </div>
                </Col>
                <Col xs='12' md='6' lg='5'>
                    <img
                        src={titleImage}
                        alt='group-selfie-happy-fair'
                        style={{ maxWidth: "100%" }}
                    />
                </Col>
            </Row>

            <Row
                className='justify-content-center align-items-center p-4'
                style={{ minHeight: "55vh", backgroundColor: "#fff" }}
            >
                <Row
                    style={{ maxWidth: "950px", minWidth: "300px" }}
                    className='justify-content-center align-items-center'
                >
                    <Col xs='12' sm='6' md='4' className='my-2'>
                        <img
                            src={logo1}
                            alt='icon-fair-division'
                            style={{ width: "125px", height: "125px" }}
                        />
                        <h1 className='iconDesc'>Fair</h1>
                        <p className='iconDescSmall'>
                            Our algorithms results in mathematically proven fair
                            allocations.
                        </p>
                    </Col>
                    <Col xs='12' sm='6' md='4' className='my-2'>
                        <img
                            src={logo2}
                            alt='icon-team-diverse'
                            style={{ width: "125px", height: "125px" }}
                        />
                        <h1 className='iconDesc'>Personalised</h1>
                        <p className='iconDescSmall'>
                            You decide which of our many algorithms to use,
                            based on your preferences.
                        </p>
                    </Col>
                    <Col xs='12' sm='6' md='4' className='my-2'>
                        <img
                            src={logo3}
                            alt='icon-check-star'
                            style={{ width: "125px", height: "125px" }}
                        />
                        <h1 className='iconDesc'>Easy</h1>
                        <p className='iconDescSmall'>
                            Our service is as quick and straightforward to use
                            as possible.
                        </p>
                    </Col>
                </Row>
            </Row>

            <Row
                className='justify-content-center divBlockWithContentPrimary align-items-center p-5'
                style={{ minHeight: "60vh" }}
                ref={goodsDesc}
            >
                <div className='' style={{ maxWidth: "1250px" }}>
                    <h3 className=''>We can help you</h3>
                    <Row className='mt-5 justify-content-center align-items-center'>
                        <Col
                            style={{ display: "inline" }}
                            xs='12'
                            sm='12'
                            md='6'
                            lg='4'
                            className='my-3'
                        >
                            <img
                                src={logo4}
                                alt='icon-house-rent'
                                style={{ width: "125px", height: "125px" }}
                            />
                            <h1 className='iconDesc2'>Share Rent</h1>
                            <p className='mt-2 goodDescParagraph'>
                                Renting an apartment with your friends can be
                                tricky. How do you decide who gets what room
                                without anyone feeling upset. Our algorithms use
                                your values for each room to give you a
                                mathematically fair allocation.
                            </p>
                            <Link
                                className='m-2'
                                style={{ textDecoration: "none" }}
                                to='/Distribute/Information/Rent'
                            >
                                <Button variant='secondary' size='sm'>
                                    <span className='smButtonText'>Start</span>
                                </Button>
                            </Link>
                        </Col>
                        <Col
                            style={{ display: "inline" }}
                            xs='12'
                            sm='12'
                            md='6'
                            lg='4'
                            className='my-3'
                        >
                            <img
                                src={logo5}
                                alt='icon-jewelry-goods'
                                style={{ width: "125px", height: "125px" }}
                            />
                            <h1 className='iconDesc2'>Share Goods</h1>
                            <p className='mt-2 goodDescParagraph'>
                                Share any type of good such as jewelry,
                                financial assets, or real estate. Simply enter
                                the details of each good. By assigning a
                                monetary valuation for each good, we give you a
                                envy-free allocation that maximizes the sum of
                                bids.
                            </p>
                            <Link
                                className='m-2'
                                style={{ textDecoration: "none" }}
                                to='/Distribute/Information/Goods'
                            >
                                <Button variant='secondary' size='sm'>
                                    <span className='smButtonText'>Start</span>
                                </Button>
                            </Link>
                        </Col>
                        <Col
                            style={{ display: "inline" }}
                            xs='12'
                            sm='12'
                            md='6'
                            lg='4'
                            className='my-3'
                        >
                            <img
                                src={logo6}
                                alt='divorce-assets-finance-fair'
                                style={{ width: "125px", height: "125px" }}
                            />
                            <h1 className='iconDesc2'>Separate Finances</h1>
                            <p className='mt-2 goodDescParagraph'>
                                When you divorce or end a civil partnership,
                                separating your money and property is very
                                tricky. Our service can help start things off by
                                giving you a fair distribution of assets based
                                on which goods you value. And this isn't limited
                                to finances.
                            </p>
                            <Link
                                className='m-2'
                                style={{ textDecoration: "none" }}
                                to='/Distribute/Information/Goods'
                            >
                                <Button variant='secondary' size='sm'>
                                    <span className='smButtonText'>Start</span>
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </div>
            </Row>

            <Row
                className='justify-content-center divBlockWithContentSecondary align-items-center p-4'
                style={{ minHeight: "60vh" }}
            >
                <Container style={{ maxWidth: "1200px" }}>
                    <Col xs='12'>
                        <h5>How does it work?</h5>
                        <h1 className='greenText'>Simple</h1>
                    </Col>
                    <hr />
                    <Row>
                        <Col sm='6' md='3' className='my-2'>
                            <img
                                src={logoStep1}
                                alt='icon-information-entry-step1'
                                style={{ width: "125px", height: "125px" }}
                            />
                            <h5 className='descText'>
                                1. Enter info about your items and group.
                            </h5>
                        </Col>
                        <Col sm='6' md='3' className='my-2'>
                            <img
                                src={logoStep2}
                                alt='icon-questions-step2'
                                style={{ width: "125px", height: "125px" }}
                            />
                            <h5 className='descText'>
                                2. Complete a short questionnaire.
                            </h5>
                        </Col>
                        <Col sm='6' md='3' className='my-2'>
                            <img
                                src={logoStep3}
                                alt='icon-values-step3'
                                style={{ width: "125px", height: "125px" }}
                            />
                            <h5 className='descText'>
                                3. Assess the value of each item.
                            </h5>
                        </Col>
                        <Col sm='6' md='3' className='my-2'>
                            <img
                                src={logoStep4}
                                alt='icon-allocation-step4'
                                style={{ width: "125px", height: "125px" }}
                            />
                            <h5 className='descText'>4. See who gets what.</h5>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </Container>
    );
};

export default MainPage;
