import React from 'react';
import './App.css';
import './App.scss';

// React Router
import { Switch, Route, useLocation } from 'react-router-dom';

// Import all react components.
import MainPage from './Components/MainPage/MainPage';
import LearnMainPage from './Components/Learn/LearnMainPage';
import DistributeMainPage from './Components/Distribute/DistributeMainPage';
import DistributeRentPage from './Components/Distribute/DistributeRentPage';
import DistributeGoodsPage from './Components/Distribute/DistributeGoodsPage';
import QuestionnairePageShell from './Components/Questionnaire/QuestionnairePageShell';
import SetValuations from './Components/Distribute/SetValuations';
import ResultsPage from './Components/Results/ResultsPage';
import NavCom from './Components/Navigation/NavCom';
import Footer from './Components/Navigation/Footer';
import CreateAccount from './Components/Account/CreateAccount';
import Login from './Components/Account/Login';

function App() {
  // Contains info about route.
  const location = useLocation();

  return (
    <div className="App">
      <NavCom/>
      <Switch location={location} key={location.pathname}>
          <Route exact path='/' component={MainPage}/>
          <Route exact path='/Learn' component={LearnMainPage}/>
          <Route exact path='/Distribute' component={DistributeMainPage}/>
          <Route exact path='/Distribute/Rent' component={DistributeRentPage}/>
          <Route exact path='/Distribute/Goods' component={DistributeGoodsPage}/>
          <Route exact path='/Distribute/Questions' component={QuestionnairePageShell}/>
          <Route exact path='/Distribute/Valuations' component={SetValuations}/>
          <Route exact path='/Results' component={ResultsPage}/>
          <Route exact path='/CreateAccount' component={CreateAccount}/>
          <Route exact path='/Login' component={Login}/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
