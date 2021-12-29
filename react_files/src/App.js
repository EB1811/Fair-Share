import React, { Suspense, lazy } from 'react'
import './App.css'
import './App.scss'

// React Router
import { Switch, Route, useLocation, Redirect } from 'react-router-dom'

import { useSelector } from 'react-redux'

// Helper.
import ScrollToTop from './Components/Helpers/ScrollToTop'

// Loading Page fallback.
import LoadingScreen from './Components/LoadingScreen/LoadingScreen'
// Navigation bar.
import NavCom from './Components/Navigation/NavCom'
import { Helmet } from 'react-helmet-async'

//* Import all react components. Lazy.
const MainPage = lazy(() => import('./Components/MainPage/MainPage'))
const MainPage2 = lazy(() => import('./Components/MainPage/MainPage2'))
const About = lazy(() => import('./Components/MainPage/About'))
const LearnMainPage = lazy(() =>
    import('./Components/LearningPage/LearnMainPage')
)
const Footer = lazy(() => import('./Components/Navigation/Footer'))
// Account.
const CreateAccountPage = lazy(() =>
    import('./Components/Account/CreateAccountPage')
)
const LoginPage = lazy(() => import('./Components/Account/LoginPage'))
const AccountBoardPage = lazy(() =>
    import('./Components/Account/AccountBoardPage')
)
const SessionNotificationOverlay = lazy(() =>
    import('./Components/Notifications/SessionNotificationOverlay')
)
// Distribute
const LocalOrRemoteQuestionPage = lazy(() =>
    import(
        './Components/Distribute/QuestionnaireSubcomponents/LocalOrRemoteQuestionPage'
    )
)
// Local..
const Goods_GatherInfoPage = lazy(() =>
    import('./Components/Distribute/Local/Goods/Goods_GatherInfoPage')
)
const Rent_GatherInfoPage = lazy(() =>
    import('./Components/Distribute/Local/Rent/Rent_GatherInfoPage')
)
const Divorce_GatherGoodsInfoPage = lazy(() =>
    import('./Components/Distribute/Local/Divorce/Divorce_GatherGoodsInfoPage')
)
const Divorce_GatherMoneyInfoPage = lazy(() =>
    import('./Components/Distribute/Local/Divorce/Divorce_GatherMoneyInfoPage')
)
const LocalInputGroupInfoPage = lazy(() =>
    import('./Components/Distribute/Local/Group/LocalInputGroupInfoPage')
)
const SetValuationsPage = lazy(() =>
    import('./Components/Distribute/Local/SetValuations/SetValuationsPage')
)
const LocalResultsPage = lazy(() =>
    import('./Components/Distribute/Local/Results/LocalResultsPage')
)
// Remote.
const RemoteGatherGoodsPage = lazy(() =>
    import(
        './Components/Distribute/Remote/GatherInfo/Goods/RemoteGatherGoodsPage'
    )
)
const RemoteDivorce_GatherMoneyInfoPage = lazy(() =>
    import(
        './Components/Distribute/Remote/GatherInfo/Goods/RemoteDivorce_GatherMoneyInfoPage'
    )
)
const RemoteInputGroupInfoPage = lazy(() =>
    import(
        './Components/Distribute/Remote/GatherInfo/Group/RemoteInputGroupInfoPage'
    )
)
const Remote_SetValuationsPage = lazy(() =>
    import(
        './Components/Distribute/Remote/SetValuations/Remote_SetValuationsPage'
    )
)
const RemoteResultsPage = lazy(() =>
    import('./Components/Distribute/Remote/Results/RemoteResultsPage')
)

function App() {
    // Get auth objects from firestore.
    const profile = useSelector((state) => state.firebase.profile)

    // Contains info about route.
    const location = useLocation()

    //? Change questions and group info route to a single route if no difference in questions or group data collection.
    return (
        <div className='App'>
            <Helmet>
                <title>SplitSum</title>
                <meta
                    name='description'
                    content='We help users share rent, split goods, and separate finances in a way that mathematically guarantees no person will feel envy towards someone else.
                    This is done by using fair division and rental harmony algorithms that are made to solve sharing problems, i.e., split goods between people in a way that doesn’t cause resentment.
                    The algorithms take everyone’s monetary valuations and compute an allocation which result in no one feeling envy towards someone else. Additionally, these algorithms result in a pareto-efficient situation, where no one would be better of without making at least 1 other person worse of.
                    Multiple harmony algorithms are included for each sharing case.
                    Users can share their rent, indivisible goods, and their finances, which can include both indivisible goods and money.'
                />
                <meta
                    name='keywords'
                    content='sharing, share rent, rental harmony, fair division, splitsum, split'
                />
            </Helmet>
            <NavCom />
            <ScrollToTop />
            {profile.isLoaded && !profile.isEmpty ? (
                <Suspense fallback={<div></div>}>
                    <SessionNotificationOverlay profile={profile} />
                </Suspense>
            ) : null}
            <Suspense fallback={<LoadingScreen />}>
                <Switch location={location} key={location.pathname}>
                    <Route exact path='/' component={MainPage} />
                    <Route exact path='/2' component={MainPage2} />
                    <Route exact path='/About' component={About} />
                    <Route exact path='/Learn' component={LearnMainPage} />

                    {/*//* Remote */}
                    <Route
                        exact
                        path='/Distribute/localremote/:goodType'
                        component={LocalOrRemoteQuestionPage}
                    />
                    <Route
                        exact
                        path='/Distribute/GoodInfo/Remote/:sessionID'
                        component={RemoteGatherGoodsPage}
                    />
                    <Route
                        exact
                        path='/Distribute/GoodInfo/Remote/:sessionID/2'
                        component={RemoteDivorce_GatherMoneyInfoPage}
                    />
                    <Route
                        exact
                        path='/Distribute/GroupInfo/Remote/:sessionID'
                        component={RemoteInputGroupInfoPage}
                    />
                    <Route
                        exact
                        path='/Distribute/Valuations/Remote/:sessionID'
                        component={Remote_SetValuationsPage}
                    />
                    <Route
                        exact
                        path='/Distribute/Results/Remote/:sessionID'
                        component={RemoteResultsPage}
                    />

                    {/*//* Local */}
                    <Route
                        exact
                        path='/Distribute/GoodInfo/Local/Goods'
                        component={Goods_GatherInfoPage}
                    />
                    <Route
                        exact
                        path='/Distribute/GoodInfo/Local/Rent'
                        component={Rent_GatherInfoPage}
                    />
                    <Route
                        exact
                        path='/Distribute/GoodInfo/Local/Divorce'
                        component={Divorce_GatherGoodsInfoPage}
                    />
                    <Route
                        exact
                        path='/Distribute/GoodInfo/Local/Divorce2'
                        component={Divorce_GatherMoneyInfoPage}
                    />
                    <Route
                        exact
                        path='/Distribute/GroupInfo/Local/:goodType'
                        component={LocalInputGroupInfoPage}
                    />
                    <Route
                        exact
                        path='/Distribute/Valuations/Local/:goodType'
                        component={SetValuationsPage}
                    />
                    <Route
                        exact
                        path='/Distribute/Results/Local/:goodType'
                        component={LocalResultsPage}
                    />

                    <Route
                        exact
                        path='/CreateAccount'
                        component={CreateAccountPage}
                    />
                    <Route exact path='/Login' component={LoginPage} />
                    <Route exact path='/Account' component={AccountBoardPage} />
                    <Route render={() => <Redirect to='/' />} />
                </Switch>
            </Suspense>
            <Suspense fallback={<LoadingScreen />}>
                <Footer />
            </Suspense>
        </div>
    )
}

export default App
