import React, { Suspense, lazy } from "react";
import "./App.css";
import "./App.scss";

// React Router
import { Switch, Route, useLocation, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";

// Helper.
import ScrollToTop from "./Components/Helpers/ScrollToTop";

// Loading Page fallback.
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen";
import NavCom from "./Components/Navigation/NavCom";

// Import all react components. Lazy.
const MainPage = lazy(() => import("./Components/MainPage/MainPage"));
const About = lazy(() => import("./Components/MainPage/About"));
const LearnMainPage = lazy(() =>
    import("./Components/LearningPage/LearnMainPage")
);

const Footer = lazy(() => import("./Components/Navigation/Footer"));

const CreateAccount = lazy(() => import("./Components/Account/CreateAccount"));
const Login = lazy(() => import("./Components/Account/Login"));
const AccountBoard = lazy(() => import("./Components/Account/AccountBoard"));

const SessionNotificationOverlay = lazy(() =>
    import("./Components/Notifications/SessionNotificationOverlay")
);

// Distribute
const LocalOrRemoteQuestion = lazy(() =>
    import(
        "./Components/Distribute/QuestionnaireSubcomponents/LocalOrRemoteQuestion"
    )
);

// Local..
const Goods_GatherInfoPage = lazy(() =>
    import("./Components/Distribute/Local/Goods/Goods_GatherInfoPage")
);
const Rent_GatherInfoPage = lazy(() =>
    import("./Components/Distribute/Local/Rent/Rent_GatherInfoPage")
);
const Divorce_GatherGoodsInfoPage = lazy(() =>
    import("./Components/Distribute/Local/Divorce/Divorce_GatherGoodsInfoPage")
);
const Divorce_GatherMoneyInfoPage = lazy(() =>
    import("./Components/Distribute/Local/Divorce/Divorce_GatherMoneyInfoPage")
);
const LocalInputGroupInfoPage = lazy(() =>
    import("./Components/Distribute/Local/Group/LocalInputGroupInfoPage")
);
const SetValuationsPage = lazy(() =>
    import("./Components/Distribute/Local/SetValuations/SetValuationsPage")
);
const LocalResultsPage = lazy(() =>
    import("./Components/Distribute/Local/Results/LocalResultsPage")
);

// Remote.
const RemoteGatherGoodsPage = lazy(() =>
    import(
        "./Components/Distribute/Remote/GatherInfo/Goods/RemoteGatherGoodsPage"
    )
);
const RemoteDivorce_GatherMoneyInfoPage = lazy(() =>
    import(
        "./Components/Distribute/Remote/GatherInfo/Goods/RemoteDivorce_GatherMoneyInfoPage"
    )
);
const RemoteInputGroupInfoPage = lazy(() =>
    import(
        "./Components/Distribute/Remote/GatherInfo/Group/RemoteInputGroupInfoPage"
    )
);
const Remote_SetValuationsPage = lazy(() =>
    import(
        "./Components/Distribute/Remote/SetValuations/Remote_SetValuationsPage"
    )
);
const RemoteResultsPage = lazy(() =>
    import("./Components/Distribute/Remote/Results/RemoteResultsPage")
);

function App() {
    // Get auth objects from firestore.
    const auth = useSelector((state) => state.firebase.auth);

    // Contains info about route.
    const location = useLocation();

    //? Change questions and group info route to a single route if no difference in questions or group data collection.
    return (
        <div className='App'>
            <NavCom />
            <ScrollToTop />
            {auth.isLoaded && !auth.isEmpty ? (
                <Suspense fallback={<div></div>}>
                    <SessionNotificationOverlay auth={auth} />
                </Suspense>
            ) : null}
            <Suspense fallback={<LoadingScreen />}>
                <Switch location={location} key={location.pathname}>
                    <Route exact path='/' component={MainPage} />
                    <Route exact path='/About' component={About} />
                    <Route exact path='/Learn' component={LearnMainPage} />

                    {/*//* Remote */}
                    <Route
                        exact
                        path='/Distribute/localremote/:goodType'
                        component={LocalOrRemoteQuestion}
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
                        component={CreateAccount}
                    />
                    <Route exact path='/Login' component={Login} />
                    <Route exact path='/Account' component={AccountBoard} />
                    <Route render={() => <Redirect to='/' />} />
                </Switch>
            </Suspense>
            <Suspense fallback={<LoadingScreen />}>
                <Footer />
            </Suspense>
        </div>
    );
}

export default App;
