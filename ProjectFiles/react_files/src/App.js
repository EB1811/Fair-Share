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

import LocalOrRemoteQuestion from "./Components/Distribute/QuestionnaireSubcomponents/LocalOrRemoteQuestion";

// Local process components.
import Goods_GatherInfoPage from "./Components/Distribute/Local/Goods/Goods_GatherInfoPage";
import Rent_GatherInfoPage from "./Components/Distribute/Local/Rent/Rent_GatherInfoPage";
import LocalInputGroupInfoPage from "./Components/Distribute/Local/Group/LocalInputGroupInfoPage";
import GoodsQuestionnairePageShell from "./Components/Distribute/Local/Goods/GoodsQuestionnairePage";
import RentQuestionnairePageShell from "./Components/Distribute/Local/Rent/RentQuestionnairePage";
import SetValuationsPage from "./Components/Distribute/Local/SetValuations/SetValuationsPage";
import LocalResultsPage from "./Components/Distribute/Local/Results/LocalResultsPage";

// Remote process components.
import Remote_RentQuestionnairePage from "./Components/Distribute/Remote/Rent/Remote_RentQuestionnairePage";
import RemoteGoodsQuestionnairePage from "./Components/Distribute/Remote/Goods/RemoteGoodsQuestionnairePage";
import Rent_Remote_GatherInfoPage from "./Components/Distribute/Remote/Rent/Rent_Remote_GatherInfoPage";
import RemoteInputGroupInfoPage from "./Components/Distribute/Remote/Group/RemoteInputGroupInfoPage";
import Remote_SetValuationsPage from "./Components/Distribute/Remote/SetValuations/Remote_SetValuationsPage";
import RemoteResultsPage from "./Components/Distribute/Remote/Results/RemoteResultsPage";

function App() {
    // Contains info about route.
    const location = useLocation();

    //? Change questions and group info route to a single route if no difference in questions or group data collection.
    return (
        <div className='App'>
            <NavCom />
            <ScrollToTop />
            <Switch location={location} key={location.pathname}>
                <Route exact path='/' component={MainPage} />
                <Route exact path='/About' component={About} />
                <Route exact path='/Learn' component={LearnMainPage} />

                <Route
                    exact
                    path='/Distribute/localremote/:goodType'
                    component={LocalOrRemoteQuestion}
                />
                <Route
                    exact
                    path='/Distribute/Questions/Remote/Rent/:sessionID/:stage'
                    component={Remote_RentQuestionnairePage}
                />
                <Route
                    exact
                    path='/Distribute/Questions/Remote/Goods/:sessionID/:stage'
                    component={RemoteGoodsQuestionnairePage}
                />
                <Route
                    exact
                    path='/Distribute/GoodInfo/Remote/Rent/:sessionID'
                    component={Rent_Remote_GatherInfoPage}
                />
                <Route
                    exact
                    path='/Distribute/GoodInfo/Remote/Goods/:sessionID'
                    component={Rent_Remote_GatherInfoPage}
                />
                <Route
                    exact
                    path='/Distribute/GroupInfo/Remote/:sessionID/:goodType'
                    component={RemoteInputGroupInfoPage}
                />
                <Route
                    exact
                    path='/Distribute/Valuations/Remote/:sessionID/:goodType'
                    component={Remote_SetValuationsPage}
                />
                <Route
                    exact
                    path='/Distribute/Results/Remote/:sessionID/:goodType'
                    component={RemoteResultsPage}
                />

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
