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

import Goods_GatherInfoPage from "./Components/Distribute/Goods/Goods_GatherInfoPage";
import Rent_GatherInfoPage from "./Components/Distribute/Rent/Rent_GatherInfoPage";
import RemoteInputGroupInfoPage from "./Components/Distribute/Group/RemoteInputGroupInfoPage";
import LocalInputGroupInfoPage from "./Components/Distribute/Group/LocalInputGroupInfoPage";
import GoodsQuestionnairePageShell from "./Components/Distribute/Goods/GoodsQuestionnairePage";
import RentQuestionnairePageShell from "./Components/Distribute/Rent/RentQuestionnairePage";
import SetValuationsPage from "./Components/Distribute/SetValuationsPage";
import ResultsPage from "./Components/Results/ResultsPage";

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
                    path='/Distribute/Goods/Questions/:stage'
                    component={GoodsQuestionnairePageShell}
                />
                <Route
                    exact
                    path='/Distribute/Rent/Questions/:stage'
                    component={RentQuestionnairePageShell}
                />
                <Route
                    exact
                    path='/Distribute/Goods/GoodInfo'
                    component={Goods_GatherInfoPage}
                />
                <Route
                    exact
                    path='/Distribute/Rent/GoodInfo'
                    component={Rent_GatherInfoPage}
                />
                <Route
                    exact
                    path='/Distribute/Goods/GroupInfo/Local'
                    component={LocalInputGroupInfoPage}
                />
                <Route
                    exact
                    path='/Distribute/Rent/GroupInfo/Local'
                    component={LocalInputGroupInfoPage}
                />
                <Route
                    exact
                    path='/Distribute/Goods/GroupInfo/Remote'
                    component={RemoteInputGroupInfoPage}
                />
                <Route
                    exact
                    path='/Distribute/Rent/GroupInfo/Remote'
                    component={RemoteInputGroupInfoPage}
                />
                <Route
                    exact
                    path='/Distribute/Valuations'
                    component={SetValuationsPage}
                />
                <Route exact path='/Results' component={ResultsPage} />
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
