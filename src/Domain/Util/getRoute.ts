
type routes = 'home';

function getRoute(path: routes): string {
  // generatePath('/'), // generatePath(path, parameters) -> Path string and parameters an object
  const routes = {
    home: {
      route: "/",
    },
  };

  return routes[path].route;
}

export default getRoute
