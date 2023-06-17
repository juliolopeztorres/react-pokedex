import React from 'react';
import { hot } from "react-hot-loader/root";
import { Route, Switch } from 'react-router-dom';
import HomeView from '../View/HomeView';
import ServiceContainer from '../DependencyInjection/ServiceContainer';
import ServiceContainerInterface from '../DependencyInjection/ServiceContainerInterface';
import NotFoundView from "../View/NotFoundView";

type routes = 'home';

const serviceContainer: ServiceContainerInterface = new ServiceContainer();

const RouteService = () => {
  return <Switch>
    <Route exact path={getRoute('home')}>
      <HomeView/>
    </Route>
    <NotFoundView/>
  </Switch>;
}

export default hot(RouteService)

export function getRoute(path: routes): string {
  // generatePath('/'), // generatePath(path, parameters) -> Path string and parameters an object
  const routes = {
    home: {
      route: "/",
    },
  };

  return routes[path].route;
}
