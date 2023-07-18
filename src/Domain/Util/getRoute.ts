
type routes = 'home' | 'login' | 'secured';

function getRoute(path: routes): string {
  // generatePath('/'), // generatePath(path, parameters) -> Path string and parameters an object
  const routes: {[key in routes]: {route: string}} = {
    home: {
      route: "/",
    },
    login: {
      route: "/login",
    },
    secured: {
      route: "/secured",
    },
  }

  return routes[path].route
}

export default getRoute
