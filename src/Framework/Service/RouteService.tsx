import React, { useState } from 'react';
import { hot } from "react-hot-loader/root";
import { Route, Switch } from 'react-router-dom';
import DefaultView from '../View/DefaultView';
import ServiceContainer from '../DependencyInjection/ServiceContainer';
import ServiceContainerInterface from '../DependencyInjection/ServiceContainerInterface';

type routes = 'home';

const serviceContainer: ServiceContainerInterface = new ServiceContainer();

const RouteService = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false)

  const onDarkModeChanged = (status: boolean) => {
    setDarkMode(status)
  }

  return (<React.Fragment>
      <div className={darkMode ? 'dark' : ''}>
        <Switch>
          <Route exact path={getRoute('home')}>
            <DefaultView onDarkModeChanged={onDarkModeChanged}/>
          </Route>
          <h1>404 - Route not found</h1>
        </Switch>
      </div>
    </React.Fragment>
  );
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
