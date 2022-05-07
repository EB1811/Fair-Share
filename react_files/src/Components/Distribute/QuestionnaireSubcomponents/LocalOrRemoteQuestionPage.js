import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { withRouter, useParams, Redirect } from 'react-router'
import { useFirestore } from 'react-redux-firebase'

import { useDispatch, useSelector } from 'react-redux'
import questionnaireActions from '../../../ReduxStore/Actions/questionnaireActions'
import resetDistributeAction from '../../../ReduxStore/Actions/resetDistributeAction'

import shareLocal from '../../../Images/meeting-local-group_ICON.svg'
import shareOnlineGroup from '../../../Images/share-online-group_ICON.svg'

import LoadingScreen from '../../LoadingScreen/LoadingScreen'

const LocalOrRemoteQuestion = (props) => {
    let { goodType } = useParams()
    const firestore = useFirestore()

    const auth = useSelector((state) => state.firebase.auth)
    const dispatch = useDispatch()

    // Reset goods info upon entering.
    useEffect(() => {
        dispatch(resetDistributeAction.resetInfo())
        // Only execute once so
        // eslint-disable-next-line
    }, [])

    // Set the group info gathering method (local or remote) then go to next question page. User must be logged in to use the remote option.
    const setMethod = (method) => {
        dispatch(questionnaireActions.setShareMethod(method))

        if (method === 'remote' && auth.isEmpty) {
            props.history.push('/login')
        } else if (method === 'remote') {
            // Setup session info and add to firestore.
            firestore
                .add(
                    { collection: 'ShareSessions' },
                    {
                        owner: auth.uid,
                        type: goodType,
                        active: true,
                    }
                )
                .then((docSnapshot) => {
                    console.log(docSnapshot)
                    props.history.push(
                        `/Distribute/GoodInfo/Remote/${docSnapshot.id}`
                    )
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            props.history.push(`/Distribute/GoodInfo/Local/${goodType}`)
        }
    }

    if (
        (goodType === 'Rent') |
        (goodType === 'Goods') |
        (goodType === 'Divorce')
    ) {
        if (auth.isLoaded) {
            return (
                <Container
                    fluid
                    className='divBlockWithContentTertiary min-vh-100'
                >
                    <Helmet>
                        <title>
                            Share{' '}
                            {goodType === 'Divorce' ? 'Finances' : goodType}
                        </title>
                        <meta
                            name='description'
                            content={`Share ${(goodType === 'Divorce'
                                ? 'Finances'
                                : goodType
                            ).toLowerCase()} in a way that guarantees envy-freeness using our algorithms remotely or locally.`}
                        />
                    </Helmet>
                    <Row className='justify-content-center align-items-center min-vh-100'>
                        <Col
                            xs={11}
                            sm={11}
                            md={10}
                            lg={7}
                            xl={5}
                            className='centerCard m-3'
                            style={{ maxWidth: '800px' }}
                        >
                            <Row>
                                <Col xs={12} sm={6} className='my-2'>
                                    <img
                                        src={shareLocal}
                                        className='SVGButton mx-auto'
                                        alt='meeting-local-group_ICON'
                                        onClick={() => setMethod('local')}
                                        data-testid='start_local'
                                    />
                                    <p
                                        className='mt-3 text-muted'
                                        style={{ fontSize: '0.9rem' }}
                                    >
                                        Share locally, passing your device
                                        around to gather everyone's valuations.
                                    </p>
                                </Col>
                                <Col xs={12} sm={6} className='my-2'>
                                    <img
                                        src={shareOnlineGroup}
                                        className='SVGButton mx-auto'
                                        alt='share-online-group_ICON.svg'
                                        onClick={() => setMethod('remote')}
                                        data-testid='start_remote'
                                    />
                                    <p
                                        className='mt-3 text-muted'
                                        style={{ fontSize: '0.9rem' }}
                                    >
                                        Share using an online group, having
                                        members login and get invited to your
                                        party.
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            )
        } else {
            return <LoadingScreen />
        }
    } else {
        return <Redirect to='/' />
    }
}

export default withRouter(LocalOrRemoteQuestion)
