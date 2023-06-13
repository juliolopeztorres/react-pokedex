import React from "react";
import { hot } from "react-hot-loader/root";
import { getRoute } from '../Service/RouteService';
import { Link } from "react-router-dom";

const DefaultView = () => {
  return <React.Fragment>
    <section className={'block is-dark'}>
      <div className="container">
        <div className="card">
          <div className="card-content">
            <h1 className={'title'}>Welcome page :_)</h1>
            <p className={'subtitle'}>Click on the button to get some tasks</p>
            <Link to={getRoute('listTasks')}>
              <button className={'button is-large is-danger'}>Give me some tasks</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  </React.Fragment>
};

export default hot(DefaultView);
