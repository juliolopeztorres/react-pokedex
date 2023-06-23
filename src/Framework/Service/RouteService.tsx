import React from 'react';
import { hot } from "react-hot-loader/root";
import { Route, Switch } from 'react-router-dom';
import Home from '../View/HomeView';
import NotFound from "../View/NotFound";
import getRoute from "../../Domain/Util/getRoute";

const RouteService = () => {
  return <Switch>
    <Route exact path={getRoute('home')}>
      <Home/>
    </Route>
    <NotFound/>
  </Switch>;
}

export default hot(RouteService)
