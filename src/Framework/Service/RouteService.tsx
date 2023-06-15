import React from 'react';
import { hot } from "react-hot-loader/root";
import { Route, Switch } from 'react-router-dom';
import HomeView from '../View/HomeView';
import ServiceContainer from '../DependencyInjection/ServiceContainer';
import ServiceContainerInterface from '../DependencyInjection/ServiceContainerInterface';
import NavBar from "../View/Component/NavBar";
import DarkModeContainer from "../View/Component/DarkModeContainer";
import Footer from "../View/Component/Footer";
import NotFoundView from "../View/NotFoundView";

type routes = 'home';

const serviceContainer: ServiceContainerInterface = new ServiceContainer();

const RouteService = () => {
  return <DarkModeContainer>
    <NavBar/>
    <div className="grow">
      <Switch>
        <Route exact path={getRoute('home')}>
          <HomeView/>
        </Route>
        <NotFoundView/>
      </Switch>
    </div>
    <Footer/>
  </DarkModeContainer>;
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
