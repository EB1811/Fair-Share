import React from 'react';
import './App.css';

// React Router
import { Switch, Route, useLocation } from 'react-router-dom';

// Import all react components.
import MainPage from './Components/MainPage/MainPage';
import LearnMainPage from './Components/Learn/LearnMainPage';
import DistributeMainPage from './Components/Distribute/DistributeMainPage';
import DistributeRentPage from './Components/Distribute/DistributeRentPage';
import DistributeGoodsPage from './Components/Distribute/DistributeGoodsPage';

function App() {
  // Contains info about route.
  const location = useLocation();

  return (
    <div className="App">
      <Switch location={location} key={location.pathname}>
          <Route exact path='/' component={MainPage}/>
          <Route exact path='/Learn' component={LearnMainPage}/>
          <Route exact path='/Distribute' component={DistributeMainPage}/>
          <Route exact path='/Distribute/Rent' component={DistributeRentPage}/>
          <Route exact path='/Distribute/Goods' component={DistributeGoodsPage}/>
      </Switch>
    </div>
  );
}

export default App;
