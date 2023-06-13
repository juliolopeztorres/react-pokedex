import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DefaultView from '../View/DefaultView';
import TasksView from '../View/TasksView';
import ServiceContainer from '../DependencyInjection/ServiceContainer';
import CreateTaskView from '../View/CreateTaskView';
import ServiceContainerInterface from '../DependencyInjection/ServiceContainerInterface';
import NavBar from "../View/Component/NavBarComponentView";
import Footer from "../View/Component/FooterComponentView";

type routes = 'home' | 'listTasks' | 'createTask';

const serviceContainer: ServiceContainerInterface = new ServiceContainer();

export default function RouteService() {
  return (<React.Fragment>
      <div className="dark">
        <NavBar/>
        <Switch>
          <Route exact path={getRoute('home')}>
            <DefaultView/>
          </Route>
          <Route exact path={getRoute('listTasks')}>
            <TasksView serviceContainer={serviceContainer}/>
          </Route>
          <Route exact path={getRoute('createTask')}
                 render={(props) =>
                   <CreateTaskView serviceContainer={serviceContainer}{...props}/>
                 }
          />

          <h1>404 - Route not found</h1>
        </Switch>
        <Footer/>
      </div>
    </React.Fragment>
  );
}

export function getRoute(path: routes): string {
  // generatePath('/'), // generatePath(path, parameters) -> Path string and parameters an object
  const routes = {
    home: {
      route: "/",
    },
    listTasks: {
      route: '/tasks',
    },
    createTask: {
      route: '/tasks/create',
    }
  };

  return routes[path].route;
}
