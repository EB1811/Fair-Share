import React from "react";
import { Helmet } from "react-helmet-async";
// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const LearnMainPage = () => {
    return (
        <Container
            fluid
            className='divBlockWithContentTertiary min-vh-100 blackText'
        >
            <Helmet>
                <title>Learn</title>
                <meta
                    name='description'
                    content='Learn how our service uses fair division and rental harmony algorithms to compute an allocation which result in no one feeling envy towards someone else.'
                />
                <meta name='keywords' content='sharing, learn, algorithms' />
            </Helmet>
            <Row className='min-vh-100' style={{ textAlign: "left" }}>
                {/* Left */}
                <Col sm={4} md={3} lg={2} xl={2} className='sidebar p-4'>
                    <h3>Learn</h3>
                    <hr />
                    <Navbar expand='sm' variant='light'>
                        <Nav className='flex-column'>
                            <Nav.Link
                                href='#section1'
                                active={false}
                                style={{ padding: "4px" }}
                            >
                                Fair Division
                            </Nav.Link>
                            <Nav.Link
                                href='#section2'
                                active={false}
                                style={{ padding: "4px" }}
                            >
                                Sharing Goods
                            </Nav.Link>
                            <Nav.Link
                                href='#section3'
                                active={false}
                                style={{ padding: "4px" }}
                            >
                                Sharing Finances
                            </Nav.Link>
                            <Nav.Link
                                href='#section4'
                                active={false}
                                style={{ padding: "4px" }}
                            >
                                Sharing Rent
                            </Nav.Link>
                        </Nav>
                    </Navbar>
                </Col>
                {/* Right */}
                <Col sm={8} md={9} lg={7} xl={8} className='p-5'>
                    <h3 id='section1'>Fair Division</h3>
                    <hr />
                    <p>
                        Sharing items is a very common occurrence. Goods such as
                        rent, tasks, or financial assets commonly need to be
                        split among a group. <br />
                        However, splitting things in a way that doesn’t leave at
                        least someone upset is very difficult. Fair division
                        algorithms are made to try to solve this problem; split
                        goods between people in a way that doesn’t cause
                        resentment.
                    </p>
                    <p>
                        A division is considered fair if it is envy-free.
                        Envy-Free: In a division that is envy-free, every person
                        feels that their share is at least as good as the share
                        of any other person. In such a division, no user feels
                        envy. <br />
                        Another desirable property is pareto-efficiency.
                        Pareto-efficiency: A situation where no one can be
                        better off without making at least one other person
                        worse off. Envy-freeness implies Pareto-efficiency.
                    </p>
                    <h3 id='section2' className='mt-5'>
                        Sharing Goods
                    </h3>
                    <hr />
                    <p>
                        To share indivisible goods, we need a weaker notion of
                        envy-freeness. This is envy-free up to at most one good
                        (EF1). This means that, for every pair of players A and
                        B, if at most one object is removed from the bundle of
                        B, then A does not envy B. <br /> There are many
                        algorithms that can achieve this. This website employs
                        the Round-robin item allocation procedure. This
                        algorithm procedurally goes through each player, and
                        gives them their most valued good.
                    </p>
                    <h3 id='section3' className='mt-5'>
                        Sharing Finances
                    </h3>
                    <hr />
                    <p>
                        Finances included both divisible goods, in this case
                        money, and indivisible goods, such as assets. <br />
                        For this case, we can formulate another relaxation of
                        envy-freeness. One notion is envy-freeness for mixed
                        goods (EFM), which means envy-free up to 1 good with
                        respect to an agent that gets only goods, and envy-free
                        with respect to an agent that also gets money. This
                        concept was introduced in a paper by Bei et al. that
                        first appeared in the 34th AAAI Conference on Artificial
                        Intelligence (AAAI), 2020. The paper describes an
                        algorithm to achieve an EFM allocation.
                        <br />
                        For the setting used in this website, there are only two
                        agents, and the value of the divisible good (money) is
                        equal for these agents. The algorithm used to share
                        finances in the case of divorce is an implementation of
                        the one described.
                    </p>
                    <a
                        className='text-muted'
                        href='https://www.sciencedirect.com/science/article/abs/pii/S0004370220301831?via%3Dihub'
                    >
                        Xiaohui Bei, Zihao Li, Jinyan Liu, Shengxin Liu, Xinhang
                        Lu, “Fair division of mixed divisible and indivisible
                        goods”, Artificial Intelligence, Volume 293, 2021.
                    </a>
                    <h3 id='section4' className='mt-5'>
                        Sharing Rent
                    </h3>
                    <hr />
                    <p>
                        Rental harmony is a problem where items and a monetary
                        cost must be allocated together. A use case for this is
                        sharing rent. <br />
                        There are many solutions to the rental harmony division
                        problem, such as the Gap Procedure devised by Brams and
                        Kilgour or an auction type algorithm by Abdulkadiroglu,
                        Sonmez and Unver. The algorithm that we have implemented
                        is presented by Haake, Raith, and Su. Their algorithm
                        has a property called the Compensation Procedure. The
                        algorithm first finds a maxsum allocation. Then, a pool
                        of money is formed by charging the players the value of
                        their allocations. Crucially, if there is money left
                        over after paying the cost, then the algorithm
                        eliminates envy by compensating envious players. The sum
                        of compensations is the smallest sum required to
                        eliminate envy, with any money remaining being divided
                        in an envy-free way, e.g., equal amount to each person.
                    </p>
                    <p>
                        <a
                            className='text-muted'
                            href='https://link.springer.com/article/10.1007/s003550100149'
                        >
                            C. Haake, M. G. Raith, F. E. Su, “Bidding for
                            envy-freeness: A procedural approach to n-player
                            fair-division problems”, Social Choice and Welfare,
                            vol. 19, pp. 723-749, Oct 2002.
                        </a>
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default LearnMainPage;
