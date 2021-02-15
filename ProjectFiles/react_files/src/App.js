import React from "react";
import "./App.css";
import "./App.scss";

// React Router
import { Switch, Route, useLocation, Redirect } from "react-router-dom";

// Import all react components.
import MainPage from "./Components/MainPage/MainPage";
import About from "./Components/MainPage/About";
import LearnMainPage from "./Components/Learn/LearnMainPage";
import QuestionnairePageShell from "./Components/Questionnaire/QuestionnairePageShell";
import SetValuationsPage from "./Components/Distribute/SetValuationsPage";
import ResultsPage from "./Components/Results/ResultsPage";
import NavCom from "./Components/Navigation/NavCom";
import Footer from "./Components/Navigation/Footer";
import CreateAccount from "./Components/Account/CreateAccount";
import Login from "./Components/Account/Login";
import AccountBoard from "./Components/Account/AccountBoard";
import ScrollToTop from "./Components/Helpers/ScrollToTop";

import GatherGoodsInfoPage from "./Components/Distribute/GatherGoodsInfoPage";

function App() {
    // Contains info about route.
    const location = useLocation();

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
                    path='/Distribute/Information/:goodsType'
                    component={GatherGoodsInfoPage}
                />
                <Route
                    exact
                    path='/Distribute/Questions/:goodsType'
                    component={QuestionnairePageShell}
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
