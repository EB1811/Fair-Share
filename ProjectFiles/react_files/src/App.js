import React from "react";
import "./App.css";
import "./App.scss";

// React Router
import { Switch, Route, useLocation, Redirect } from "react-router-dom";

// Import all react components.
import MainPage from "./Components/MainPage/MainPage";
import About from "./Components/MainPage/About";
import LearnMainPage from "./Components/Learn/LearnMainPage";
import NavCom from "./Components/Navigation/NavCom";
import Footer from "./Components/Navigation/Footer";
import CreateAccount from "./Components/Account/CreateAccount";
import Login from "./Components/Account/Login";
import AccountBoard from "./Components/Account/AccountBoard";
import ScrollToTop from "./Components/Helpers/ScrollToTop";
import SessionNotificationOverlay from "./Components/Notifications/SessionNotificationOverlay";

import LocalOrRemoteQuestion from "./Components/Distribute/QuestionnaireSubcomponents/LocalOrRemoteQuestion";

// Local process components.
import Goods_GatherInfoPage from "./Components/Distribute/Local/Goods/Goods_GatherInfoPage";
import Rent_GatherInfoPage from "./Components/Distribute/Local/Rent/Rent_GatherInfoPage";
import Divorce_GatherGoodsInfoPage from "./Components/Distribute/Local/Divorce/Divorce_GatherGoodsInfoPage";
import Divorce_GatherMoneyInfoPage from "./Components/Distribute/Local/Divorce/Divorce_GatherMoneyInfoPage";
import LocalInputGroupInfoPage from "./Components/Distribute/Local/Group/LocalInputGroupInfoPage";
import GoodsQuestionnairePageShell from "./Components/Distribute/Local/Goods/GoodsQuestionnairePage";
import RentQuestionnairePageShell from "./Components/Distribute/Local/Rent/RentQuestionnairePage";
import SetValuationsPage from "./Components/Distribute/Local/SetValuations/SetValuationsPage";
import LocalResultsPage from "./Components/Distribute/Local/Results/LocalResultsPage";

// Remote process components.
import RemoteGatherGoodsPage from "./Components/Distribute/Remote/GatherInfo/Goods/RemoteGatherGoodsPage";
import RemoteDivorce_GatherMoneyInfoPage from "./Components/Distribute/Remote/GatherInfo/Goods/RemoteDivorce_GatherMoneyInfoPage";
import RemoteInputGroupInfoPage from "./Components/Distribute/Remote/GatherInfo/Group/RemoteInputGroupInfoPage";
import Remote_SetValuationsPage from "./Components/Distribute/Remote/SetValuations/Remote_SetValuationsPage";
import RemoteResultsPage from "./Components/Distribute/Remote/Results/RemoteResultsPage";

import { useSelector } from "react-redux";

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
                <SessionNotificationOverlay auth={auth} />
            ) : null}
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
                    path='/Distribute/Questions/Local/Goods/:stage'
                    component={GoodsQuestionnairePageShell}
                />
                <Route
                    exact
                    path='/Distribute/Questions/Local/Rent/:stage'
                    component={RentQuestionnairePageShell}
                />
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

                <Route exact path='/CreateAccount' component={CreateAccount} />
                <Route exact path='/Login' component={Login} />
                <Route exact path='/Account' component={AccountBoard} />
                <Route render={() => <Redirect to='/' />} />
            </Switch>
            <Footer />
        </div>
    );
}

export default App;
