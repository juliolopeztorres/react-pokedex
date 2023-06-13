import React, { useState } from 'react';
import { hot } from "react-hot-loader/root";
import { getRoute } from '../../Service/RouteService';
import { Link } from "react-router-dom";

const NavBar = () => {
  const [navBarMenuShown, setNavBarMenuShown] = useState<boolean>(false);

  return <React.Fragment>
    <nav className="navbar has-shadow block" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to={getRoute('home')}>
            <h1 className={'title'}>TODO</h1>
        </Link>

        <a role="button" className={`navbar-burger ${navBarMenuShown ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false"
           data-target="navbarBasicExample"
           onClick={() => setNavBarMenuShown(!navBarMenuShown)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className={`navbar-menu ${navBarMenuShown ? 'is-active' : ''}`}>
        <div className="navbar-start">
          <Link className="navbar-item" to={getRoute('listTasks')} onClick={() => setNavBarMenuShown(false)}>
            <span>List Tasks</span>
          </Link>

          <Link className="navbar-item" to={getRoute('createTask')} onClick={() => setNavBarMenuShown(false)}>
            <span>Create</span>
          </Link>
        </div>
      </div>
    </nav>
  </React.Fragment>
};

export default hot(NavBar);
