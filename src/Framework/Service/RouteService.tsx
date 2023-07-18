import React from 'react';
import { hot } from "react-hot-loader/root";
import { Route, Switch } from 'react-router-dom';
import Home from '../View/HomeView';
import NotFound from "../View/NotFound";
import Login from "../View/Login";
import getRoute from "../../Domain/Util/getRoute";
import Sandbox from "../View/Sandbox";
import LoadingContainer from "../View/Component/LoadingContainer";

const RouteService = () => {
  return <Switch>
    <Route exact path={getRoute('home')}>
      <Home/>
    </Route>
    <Route exact path={getRoute('login')}>
      <LoadingContainer>
        <Login/>
      </LoadingContainer>
    </Route>
    <Route exact path={getRoute('secured')}>
      <Sandbox/>
    </Route>
    <NotFound/>
  </Switch>;
}

export default hot(RouteService)
