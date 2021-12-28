import { useRef } from "react";

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

//TODO: [A301212-85] Dependencies outdated. Update to React 17.
//// [A301212-87] Ability to reset password in login screen.
////
//? Create a value matrix in input valuations component instead of results page.
//? Wait for auth to load before rendering anything in App.js.
//? More username error types e.g., must be over 6 characters.
//? Maybe Re-authenticate a user rather than ask to login.
////

const MainPage = () => {
    // Scrolling.
    const goodsDesc = useRef(null);
    const aboutUs = useRef(null);

    return (
        <div className='min-vh-100'>
            <section
                className='d-flex divBlockWithContentTitle w-100 align-items-center'
                style={{ height: "70vh" }}
            >
                <Container>
                    <Row
                        className='justify-content-center align-items-center backTitleImage'
                        style={{ textAlign: "left" }}
                    >
                        <Col
                            xs='12'
                            md='6'
                            lg='5'
                            className='justify-content-center align-items-center'
                        >
                            <h1 className='Title w-100'>
                                Split Goods Without Fights
                            </h1>
                            <h5
                                className='mt-2'
                                style={{ color: "#f5f5f5", fontWeight: "400" }}
                            >
                                Sharing a house with friends?
                                <br /> Need to divide financial assets?
                                <br />
                                We can help!
                            </h5>
                            <div
                                className='w-100'
                                style={{ marginTop: "50px" }}
                            >
                                <Button
                                    variant='secondary'
                                    size='sm'
                                    onClick={() =>
                                        goodsDesc.current.scrollIntoView({
                                            behavior: "smooth",
                                        })
                                    }
                                >
                                    <span className='smButtonText'>
                                        Begin Sharing
                                    </span>
                                </Button>
                                <Button
                                    variant='link'
                                    size='sm'
                                    style={{
                                        color: "#f5f5f5",
                                    }}
                                    onClick={() =>
                                        aboutUs.current.scrollIntoView({
                                            behavior: "smooth",
                                        })
                                    }
                                >
                                    <span className='smButtonText'>
                                        Learn More
                                    </span>
                                </Button>
                            </div>
                        </Col>
                        <Col xs='12' md='6' lg='7'>
                            <img
                                src={titleImage}
                                alt='group-selfie-happy-fair'
                                style={{ maxWidth: "100%" }}
                                className='group-image-home'
                            />
                        </Col>
                    </Row>
                </Container>
            </section>
            <section
                style={{ padding: "70px", backgroundColor: "#fff" }}
                ref={aboutUs}
            >
                <Container>
                    <div
                        style={{
                            paddingBottom: "20px",
                        }}
                    >
                        <h1
                            style={{
                                color: "#49db64",
                                textAlign: "center",
                            }}
                        >
                            About Us
                        </h1>
                        <hr />
                        <Row
                            style={{
                                color: "#555",
                                textAlign: "left",
                            }}
                        >
                            <Col xs='12' md='6'>
                                <p>
                                    Our service helps you solve day-to-day
                                    sharing problems using mathematical
                                    algorithms that achieve fair results.
                                </p>
                                <ul className='pr-5'>
                                    <li>
                                        We can help users share rent, share
                                        goods, and separate finances in the
                                        event of a divorce.
                                    </li>
                                    <li>
                                        Sharing is done by using fair division
                                        and rental harmony algorithms that are
                                        created to share goods fairly
                                    </li>
                                    <li>
                                        The results leave everyone in the group
                                        happy and not envious of other partners.
                                    </li>
                                    {/* <li>
                                        We are constantly looking for new areas
                                        and problems to apply our algorithms to.
                                    </li> */}
                                </ul>
                            </Col>
                            <Col xs='12' md='6'>
                                <p>
                                    Goods such as rent, or tasks commonly need
                                    to be split among a group. However,
                                    allocating things in a way that doesn’t
                                    leave at least someone upset is very
                                    difficult. Fair division algorithms are made
                                    to try to solve this problem; split goods
                                    between people in a way that doesn’t cause
                                    resentment.
                                    <br />
                                    Decades of fair division and rental harmony
                                    research is applied to help groups share
                                    without fights.
                                </p>
                                <Link
                                    style={{ textDecoration: "none" }}
                                    to='/Learn'
                                >
                                    <Button variant='primary' size='md'>
                                        <span>Learn More</span>
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                        <h1
                            style={{
                                color: "#49db64",
                                textAlign: "center",
                                marginTop: "115px",
                            }}
                        >
                            Our Service Is
                        </h1>
                        <div
                            className='d-flex justify-content-center align-items-center p-4'
                            style={{}}
                        >
                            <Row
                                style={{ maxWidth: "950px", minWidth: "300px" }}
                            >
                                <Col xs='12' sm='6' md='4' className='my-3'>
                                    <div>
                                        <img
                                            src={logo1}
                                            alt='icon-fair-division'
                                            style={{
                                                width: "125px",
                                                height: "125px",
                                            }}
                                        />
                                        <h1 className='iconDesc'>Fair</h1>
                                        <p className='iconDescSmall'>
                                            Our algorithms results in
                                            mathematically proven fair
                                            solutions.
                                        </p>
                                    </div>
                                </Col>
                                <Col xs='12' sm='6' md='4' className='my-3'>
                                    <div>
                                        <img
                                            src={logo2}
                                            alt='icon-team-diverse'
                                            style={{
                                                width: "125px",
                                                height: "125px",
                                            }}
                                        />
                                        <h1 className='iconDesc'>Convenient</h1>
                                        <p className='iconDescSmall'>
                                            You can share with a remote group or
                                            by using a local device.
                                        </p>
                                    </div>
                                </Col>
                                <Col xs='12' sm='6' md='4' className='my-3'>
                                    <div className='h-100'>
                                        <img
                                            src={logo3}
                                            alt='icon-check-star'
                                            style={{
                                                width: "125px",
                                                height: "125px",
                                            }}
                                        />
                                        <h1 className='iconDesc'>Easy</h1>
                                        <p className='iconDescSmall'>
                                            Our service is as quick and
                                            straightforward to use as possible.
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Container>
            </section>
            {/* <section style={{ minHeight: "45vh", backgroundColor: "#fff" }}>
                <div
                    className='d-flex justify-content-center align-items-center p-5'
                    style={{ minHeight: "50vh", backgroundColor: "#fff" }}
                >
                    <Row style={{ maxWidth: "950px", minWidth: "300px" }}>
                        <Col xs='12' sm='6' md='4' className='my-3'>
                            <div>
                                <img
                                    src={logo1}
                                    alt='icon-fair-division'
                                    style={{
                                        width: "125px",
                                        height: "125px",
                                    }}
                                />
                                <h1 className='iconDesc'>Fair</h1>
                                <p className='iconDescSmall'>
                                    Our algorithms results in mathematically
                                    proven fair solutions.
                                </p>
                            </div>
                        </Col>
                        <Col xs='12' sm='6' md='4' className='my-3'>
                            <div>
                                <img
                                    src={logo2}
                                    alt='icon-team-diverse'
                                    style={{
                                        width: "125px",
                                        height: "125px",
                                    }}
                                />
                                <h1 className='iconDesc'>Convenient</h1>
                                <p className='iconDescSmall'>
                                    You can share with a remote group or by
                                    using a local device.
                                </p>
                            </div>
                        </Col>
                        <Col xs='12' sm='6' md='4' className='my-3'>
                            <div className='h-100'>
                                <img
                                    src={logo3}
                                    alt='icon-check-star'
                                    style={{
                                        width: "125px",
                                        height: "125px",
                                    }}
                                />
                                <h1 className='iconDesc'>Easy</h1>
                                <p className='iconDescSmall'>
                                    Our service is as quick and straightforward
                                    to use as possible.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section> */}

            <section>
                <div
                    className='d-flex justify-content-center divBlockWithContentPrimary align-items-center p-5'
                    style={{ minHeight: "60vh" }}
                    ref={goodsDesc}
                >
                    <div className='' style={{ maxWidth: "1250px" }}>
                        <h1 className=''>We can help you</h1>
                        <Row className='mt-4 justify-content-center align-items-center'>
                            <Col
                                style={{ display: "inline" }}
                                xs='12'
                                sm='12'
                                md='6'
                                lg='4'
                                className='my-4'
                            >
                                <div
                                    style={{
                                        borderRadius: "0.375rem",
                                    }}
                                    className='p-3'
                                >
                                    <img
                                        src={logo4}
                                        alt='icon-house-rent'
                                        style={{
                                            width: "125px",
                                            height: "125px",
                                        }}
                                    />
                                    <h1 className='iconDesc2'>Share Rent</h1>
                                    <p className='mt-2 goodDescParagraph'>
                                        Renting an apartment with your friends
                                        can be tricky. How do you decide who
                                        gets what room without anyone feeling
                                        upset. Our algorithms use your values
                                        for each room to give you a
                                        mathematically fair allocation.
                                    </p>
                                    <Link
                                        className='m-2'
                                        style={{ textDecoration: "none" }}
                                        to='/Distribute/localremote/Rent'
                                    >
                                        <Button variant='secondary' size='sm'>
                                            <span className='smButtonText'>
                                                Start
                                            </span>
                                        </Button>
                                    </Link>
                                </div>
                            </Col>
                            <Col
                                style={{ display: "inline" }}
                                xs='12'
                                sm='12'
                                md='6'
                                lg='4'
                                className='my-4'
                            >
                                <div
                                    style={{
                                        borderRadius: "0.375rem",
                                    }}
                                    className='p-3'
                                >
                                    <img
                                        src={logo5}
                                        alt='icon-jewelry-goods'
                                        style={{
                                            width: "125px",
                                            height: "125px",
                                        }}
                                    />
                                    <h1 className='iconDesc2'>Share Goods</h1>
                                    <p className='mt-2 goodDescParagraph'>
                                        Share any type of good such as jewelry,
                                        financial assets, or real estate. Simply
                                        enter the details of each good. By
                                        assigning a monetary valuation for each
                                        good, we give you a envy-free allocation
                                        that maximizes the sum of bids.
                                    </p>
                                    <Link
                                        className='m-2'
                                        style={{ textDecoration: "none" }}
                                        to='/Distribute/localremote/Goods'
                                    >
                                        <Button variant='secondary' size='sm'>
                                            <span className='smButtonText'>
                                                Start
                                            </span>
                                        </Button>
                                    </Link>
                                </div>
                            </Col>
                            <Col
                                style={{ display: "inline" }}
                                xs='12'
                                sm='12'
                                md='6'
                                lg='4'
                                className='my-4'
                            >
                                <div
                                    style={{
                                        borderRadius: "0.375rem",
                                    }}
                                    className='p-3'
                                >
                                    <img
                                        src={logo6}
                                        alt='divorce-assets-finance-fair'
                                        style={{
                                            width: "125px",
                                            height: "125px",
                                        }}
                                    />
                                    <h1 className='iconDesc2'>
                                        Separate Finances
                                    </h1>
                                    <p className='mt-2 goodDescParagraph'>
                                        When you divorce or end a civil
                                        partnership, separating your money and
                                        property is very tricky. Our service can
                                        help start things off by giving you a
                                        fair distribution of assets based on
                                        which goods you value. And this isn't
                                        limited to finances.
                                    </p>
                                    <Link
                                        className='m-2'
                                        style={{ textDecoration: "none" }}
                                        to='/Distribute/localremote/Divorce'
                                    >
                                        <Button variant='secondary' size='sm'>
                                            <span className='smButtonText'>
                                                Start
                                            </span>
                                        </Button>
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </section>

            <section>
                <div
                    className='d-flex justify-content-center divBlockWithContentSecondary align-items-center p-4'
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
                                    1. Enter info about your items.
                                </h5>
                            </Col>
                            <Col sm='6' md='3' className='my-2'>
                                <img
                                    src={logoStep2}
                                    alt='icon-questions-step2'
                                    style={{ width: "125px", height: "125px" }}
                                />
                                <h5 className='descText'>
                                    2. Invite others to your group.
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
                                <h5 className='descText'>
                                    4. See who gets what.
                                </h5>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </section>

            <section style={{ padding: "60px" }}></section>

            <section>
                <div
                    className='d-flex justify-content-center divBlockWithContentGreen align-items-center p-4'
                    style={{ minHeight: "20vh" }}
                >
                    <Col>
                        <h5>
                            Want to learn more about the underlying algorithms?
                        </h5>
                        <a href='/Learn' style={{ textDecoration: "none" }}>
                            <h4 className='bigTextLink'>
                                Go to our learning page.
                            </h4>
                        </a>
                    </Col>
                </div>
            </section>
        </div>
    );
};

export default MainPage;
