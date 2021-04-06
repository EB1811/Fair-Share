import React from "react";

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
                                Section 1
                            </Nav.Link>
                            <Nav.Link
                                href='#section2'
                                active={false}
                                style={{ padding: "4px" }}
                            >
                                Section 2
                            </Nav.Link>
                            <Nav.Link
                                href='#section3'
                                active={false}
                                style={{ padding: "4px" }}
                            >
                                Section 3
                            </Nav.Link>
                            <Nav.Link
                                href='#section4'
                                active={false}
                                style={{ padding: "4px" }}
                            >
                                Section 4
                            </Nav.Link>
                            <Nav.Link
                                href='#section4'
                                active={false}
                                style={{ padding: "4px" }}
                            >
                                Section 5
                            </Nav.Link>
                        </Nav>
                    </Navbar>
                </Col>
                {/* Right */}
                <Col sm={8} md={9} lg={7} xl={8} className='p-5'>
                    <h3 id='section1'>Section 1</h3>
                    <hr />
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vivamus interdum nisi sapien. Nulla lobortis gravida
                        auctor. Aliquam ac ipsum viverra arcu ullamcorper
                        malesuada. Pellentesque varius egestas nibh, a eleifend
                        nisi cursus sit amet. Proin dictum posuere erat non
                        facilisis. Vivamus id interdum sapien. Proin imperdiet
                        risus id odio condimentum aliquam. Curabitur sagittis
                        tempor scelerisque. Vestibulum non neque dictum, porta
                        mi ut, dignissim elit. Nam sit amet lacinia sapien.
                        Maecenas mollis nisl nec mollis aliquam. Pellentesque
                        dictum laoreet metus, a condimentum elit rhoncus tempor.
                        Curabitur vehicula sit amet sem at pulvinar. Nunc
                        bibendum odio sapien, sed ullamcorper leo commodo vitae.
                        Fusce sit amet ullamcorper leo. Vivamus venenatis augue
                        ut lectus euismod, sed hendrerit nulla imperdiet. <br />
                        Praesent luctus nunc ut eleifend tempor. Etiam a
                        venenatis diam. Morbi in lobortis arcu, ut fermentum
                        sem. Suspendisse nibh lacus, mattis nec ex sodales,
                        elementum pharetra nisl. Donec condimentum laoreet nisi
                        sed luctus. Morbi malesuada eu magna vel vulputate. Cras
                        quis purus urna. Donec odio nulla, vehicula sed laoreet
                        ut, malesuada semper nibh. Mauris in maximus odio, ac
                        fermentum dolor. Aliquam sed libero et mauris euismod
                        mollis commodo vitae felis. Aenean eget justo cursus,
                        consectetur magna in, aliquam lectus. Maecenas nisi
                        quam, tincidunt quis tristique a, vestibulum at purus.
                        Integer urna ligula, scelerisque sit amet velit ut,
                        porta tincidunt elit. Suspendisse ac nibh et diam auctor
                        gravida. Etiam faucibus feugiat eros, sed faucibus arcu
                        accumsan quis. Pellentesque at urna tempor, aliquet
                        risus ac, tincidunt libero. Aenean hendrerit ipsum
                        tempus, semper nulla id, volutpat dui. Fusce euismod
                        vitae augue non vehicula. Donec commodo porta rutrum.
                        Mauris imperdiet gravida ligula sit amet semper. Donec
                        dolor est, feugiat at tortor viverra, imperdiet finibus
                        metus. Praesent tincidunt laoreet enim vitae vestibulum.
                        Maecenas purus ipsum, dictum quis ex ac, suscipit
                        efficitur neque. Fusce malesuada augue urna, nec dictum
                        massa porta maximus. Suspendisse potenti. <br />
                        Curabitur placerat in ex sed convallis. Nam rhoncus
                        lorem nec neque sollicitudin posuere. Duis sem nibh,
                        dignissim suscipit ante vitae, consectetur luctus ex.
                        Sed at nunc quis lacus consectetur eleifend. Sed vitae
                        luctus mauris. Curabitur semper id eros quis vulputate.
                    </p>
                    <p>
                        Maecenas enim mauris, vehicula et erat hendrerit,
                        vulputate suscipit ipsum. Maecenas quis arcu eget tellus
                        imperdiet vulputate vel et quam. Suspendisse a dolor
                        erat. Vivamus dapibus tempus risus, ut egestas arcu
                        dignissim eu. Suspendisse rutrum lacus ipsum, sed
                        placerat turpis aliquam vitae. Aliquam pulvinar, quam in
                        ornare vulputate, nisl sapien molestie neque, sed
                        bibendum mi nibh a sapien. Pellentesque sagittis feugiat
                        aliquet. Aliquam erat volutpat. Nulla luctus porta
                        velit, in fermentum tellus accumsan non. In nec
                        condimentum urna. Cras porta nisl id velit volutpat
                        sollicitudin. Nullam gravida leo at lorem hendrerit, vel
                        ultricies erat tempor. Duis sit amet sapien lectus.
                        Integer eleifend pretium laoreet. Nullam lacus sapien,
                        luctus ut varius eu, ultricies nec erat. Suspendisse
                        efficitur elementum ligula ut tincidunt. Morbi fringilla
                        leo non maximus luctus. Aenean nec sapien magna. Sed
                        lobortis tincidunt leo, consequat aliquam lorem varius
                        id. Quisque tellus elit, condimentum in mauris et,
                        fermentum ullamcorper nibh. Nulla at tortor sem. Nam eu
                        auctor enim. Sed ante orci, tincidunt a tristique vel,
                        lacinia non enim.
                    </p>
                    <h3 id='section2' className='mt-5'>
                        Section 2
                    </h3>
                    <hr />
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vivamus interdum nisi sapien. Nulla lobortis gravida
                        auctor. Aliquam ac ipsum viverra arcu ullamcorper
                        malesuada. Pellentesque varius egestas nibh, a eleifend
                        nisi cursus sit amet. Proin dictum posuere erat non
                        facilisis. Vivamus id interdum sapien. Proin imperdiet
                        risus id odio condimentum aliquam. Curabitur sagittis
                        tempor scelerisque. Vestibulum non neque dictum, porta
                        mi ut, dignissim elit. Nam sit amet lacinia sapien.
                        Maecenas mollis nisl nec mollis aliquam. Pellentesque
                        dictum laoreet metus, a condimentum elit rhoncus tempor.
                        Curabitur vehicula sit amet sem at pulvinar. Nunc
                        bibendum odio sapien, sed ullamcorper leo commodo vitae.
                        Fusce sit amet ullamcorper leo. Vivamus venenatis augue
                        ut lectus euismod, sed hendrerit nulla imperdiet. <br />
                        tempus, semper nulla id, volutpat dui. Fusce euismod
                        vitae augue non vehicula. Donec commodo porta rutrum.
                        Mauris imperdiet gravida ligula sit amet semper. Donec
                        dolor est, feugiat at tortor viverra, imperdiet finibus
                        metus. Praesent tincidunt laoreet enim vitae vestibulum.
                        Maecenas purus ipsum, dictum quis ex ac, suscipit
                        efficitur neque. Fusce malesuada augue urna, nec dictum
                        massa porta maximus. Suspendisse potenti. <br />
                        Curabitur placerat in ex sed convallis. Nam rhoncus
                        lorem nec neque sollicitudin posuere. Duis sem nibh,
                        dignissim suscipit ante vitae, consectetur luctus ex.
                        Sed at nunc quis lacus consectetur eleifend. Sed vitae
                        luctus mauris. Curabitur semper id eros quis vulputate.
                    </p>
                    <h3 id='section3' className='mt-5'>
                        Section 3
                    </h3>
                    <hr />
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vivamus interdum nisi sapien. Nulla lobortis gravida
                        auctor. Aliquam ac ipsum viverra arcu ullamcorper
                        malesuada. Pellentesque varius egestas nibh, a eleifend
                        nisi cursus sit amet. Proin dictum posuere erat non
                        facilisis. Vivamus id interdum sapien. Proin imperdiet
                        risus id odio condimentum aliquam. Curabitur sagittis
                        tempor scelerisque. Vestibulum non neque dictum, porta
                        mi ut, dignissim elit. Nam sit amet lacinia sapien.
                        Maecenas mollis nisl nec mollis aliquam. Pellentesque
                        dictum laoreet metus, a condimentum elit rhoncus tempor.
                        Curabitur vehicula sit amet sem at pulvinar. Nunc
                        bibendum odio sapien, sed ullamcorper leo commodo vitae.
                        Fusce sit amet ullamcorper leo. Vivamus venenatis augue
                        ut lectus euismod, sed hendrerit nulla imperdiet. <br />
                        tempus, semper nulla id, volutpat dui. Fusce euismod
                        vitae augue non vehicula. Donec commodo porta rutrum.
                        Mauris imperdiet gravida ligula sit amet semper. Donec
                        dolor est, feugiat at tortor viverra, imperdiet finibus
                        metus. Praesent tincidunt laoreet enim vitae vestibulum.
                        Maecenas purus ipsum, dictum quis ex ac, suscipit
                        efficitur neque. Fusce malesuada augue urna, nec dictum
                        massa porta maximus. Suspendisse potenti. <br />
                        Curabitur placerat in ex sed convallis. Nam rhoncus
                        lorem nec neque sollicitudin posuere. Duis sem nibh,
                        dignissim suscipit ante vitae, consectetur luctus ex.
                        Sed at nunc quis lacus consectetur eleifend. Sed vitae
                        luctus mauris. Curabitur semper id eros quis vulputate.
                    </p>
                    <p>
                        Maecenas enim mauris, vehicula et erat hendrerit,
                        vulputate suscipit ipsum. Maecenas quis arcu eget tellus
                        imperdiet vulputate vel et quam. Suspendisse a dolor
                        erat. Vivamus dapibus tempus risus, ut egestas arcu
                        sollicitudin. Nullam gravida leo at lorem hendrerit, vel
                        ultricies erat tempor. Duis sit amet sapien lectus.
                        Integer eleifend pretium laoreet. Nullam lacus sapien,
                        luctus ut varius eu, ultricies nec erat. Suspendisse
                        efficitur elementum ligula ut tincidunt. Morbi fringilla
                        leo non maximus luctus. Aenean nec sapien magna. Sed
                        lobortis tincidunt leo, consequat aliquam lorem varius
                        id. Quisque tellus elit, condimentum in mauris et,
                        fermentum ullamcorper nibh. Nulla at tortor sem. Nam eu
                        auctor enim. Sed ante orci, tincidunt a tristique vel,
                        lacinia non enim.
                    </p>
                    <h3 id='section4' className='mt-5'>
                        Section 4
                    </h3>
                    <hr />
                    <p>
                        Maecenas enim mauris, vehicula et erat hendrerit,
                        vulputate suscipit ipsum. Maecenas quis arcu eget tellus
                        imperdiet vulputate vel et quam. Suspendisse a dolor
                        erat. Vivamus dapibus tempus risus, ut egestas arcu
                        sollicitudin. Nullam gravida leo at lorem hendrerit, vel
                        ultricies erat tempor. Duis sit amet sapien lectus.
                        Integer eleifend pretium laoreet. Nullam lacus sapien,
                        luctus ut varius eu, ultricies nec erat. Suspendisse
                        efficitur elementum ligula ut tincidunt. Morbi fringilla
                        leo non maximus luctus. Aenean nec sapien magna. Sed
                        lobortis tincidunt leo, consequat aliquam lorem varius
                        id. Quisque tellus elit, condimentum in mauris et,
                        fermentum ullamcorper nibh. Nulla at tortor sem. Nam eu
                        auctor enim. Sed ante orci, tincidunt a tristique vel,
                        lacinia non enim.
                    </p>
                    <h3 id='section5'>Section 5</h3>
                    <hr />
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vivamus interdum nisi sapien. Nulla lobortis gravida
                        auctor. Aliquam ac ipsum viverra arcu ullamcorper
                        malesuada. Pellentesque varius egestas nibh, a eleifend
                        nisi cursus sit amet. Proin dictum posuere erat non
                        facilisis. Vivamus id interdum sapien. Proin imperdiet
                        risus id odio condimentum aliquam. Curabitur sagittis
                        tempor scelerisque. Vestibulum non neque dictum, porta
                        mi ut, dignissim elit. Nam sit amet lacinia sapien.
                        Maecenas mollis nisl nec mollis aliquam. Pellentesque
                        dictum laoreet metus, a condimentum elit rhoncus tempor.
                        Curabitur vehicula sit amet sem at pulvinar. Nunc
                        bibendum odio sapien, sed ullamcorper leo commodo vitae.
                        Fusce sit amet ullamcorper leo. Vivamus venenatis augue
                        ut lectus euismod, sed hendrerit nulla imperdiet. <br />
                        Praesent luctus nunc ut eleifend tempor. Etiam a
                        venenatis diam. Morbi in lobortis arcu, ut fermentum
                        sem. Suspendisse nibh lacus, mattis nec ex sodales,
                        elementum pharetra nisl. Donec condimentum laoreet nisi
                        sed luctus. Morbi malesuada eu magna vel vulputate. Cras
                        quis purus urna. Donec odio nulla, vehicula sed laoreet
                        ut, malesuada semper nibh. Mauris in maximus odio, ac
                        fermentum dolor. Aliquam sed libero et mauris euismod
                        mollis commodo vitae felis. Aenean eget justo cursus,
                        consectetur magna in, aliquam lectus. Maecenas nisi
                        quam, tincidunt quis tristique a, vestibulum at purus.
                        Integer urna ligula, scelerisque sit amet velit ut,
                        porta tincidunt elit. Suspendisse ac nibh et diam auctor
                        gravida. Etiam faucibus feugiat eros, sed faucibus arcu
                        accumsan quis. Pellentesque at urna tempor, aliquet
                        risus ac, tincidunt libero. Aenean hendrerit ipsum
                        tempus, semper nulla id, volutpat dui. Fusce euismod
                        vitae augue non vehicula. Donec commodo porta rutrum.
                        Mauris imperdiet gravida ligula sit amet semper. Donec
                        dolor est, feugiat at tortor viverra, imperdiet finibus
                        metus. Praesent tincidunt laoreet enim vitae vestibulum.
                        Maecenas purus ipsum, dictum quis ex ac, suscipit
                        efficitur neque. Fusce malesuada augue urna, nec dictum
                        massa porta maximus. Suspendisse potenti. <br />
                        Curabitur placerat in ex sed convallis. Nam rhoncus
                        lorem nec neque sollicitudin posuere. Duis sem nibh,
                        dignissim suscipit ante vitae, consectetur luctus ex.
                        Sed at nunc quis lacus consectetur eleifend. Sed vitae
                        luctus mauris. Curabitur semper id eros quis vulputate.
                    </p>
                    <p>
                        Maecenas enim mauris, vehicula et erat hendrerit,
                        vulputate suscipit ipsum. Maecenas quis arcu eget tellus
                        imperdiet vulputate vel et quam. Suspendisse a dolor
                        erat. Vivamus dapibus tempus risus, ut egestas arcu
                        dignissim eu. Suspendisse rutrum lacus ipsum, sed
                        placerat turpis aliquam vitae. Aliquam pulvinar, quam in
                        ornare vulputate, nisl sapien molestie neque, sed
                        bibendum mi nibh a sapien. Pellentesque sagittis feugiat
                        aliquet. Aliquam erat volutpat. Nulla luctus porta
                        velit, in fermentum tellus accumsan non. In nec
                        condimentum urna. Cras porta nisl id velit volutpat
                        sollicitudin. Nullam gravida leo at lorem hendrerit, vel
                        ultricies erat tempor. Duis sit amet sapien lectus.
                        Integer eleifend pretium laoreet. Nullam lacus sapien,
                        luctus ut varius eu, ultricies nec erat. Suspendisse
                        efficitur elementum ligula ut tincidunt. Morbi fringilla
                        leo non maximus luctus. Aenean nec sapien magna. Sed
                        lobortis tincidunt leo, consequat aliquam lorem varius
                        id. Quisque tellus elit, condimentum in mauris et,
                        fermentum ullamcorper nibh. Nulla at tortor sem. Nam eu
                        auctor enim. Sed ante orci, tincidunt a tristique vel,
                        lacinia non enim.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default LearnMainPage;
