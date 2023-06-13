import React from 'react';
import { hot } from "react-hot-loader/root";

const Footer = () => {
  return <React.Fragment>
    {/*<nav className="navbar is-fixed-bottom">*/}
    {/*  <footer className="footer navbar-content">*/}
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            Crafted by <a href="https://github.com/juliolopeztorres" target={'_blank'} rel={'noopener noreferrer'}>Julio López</a>.&nbsp;
            Javascript using <b>React</b> by <a href="https://facebook.com" target={'_blank'} rel={'noopener noreferrer'}>Facebook</a>.&nbsp;
            Styles using <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>.
          </p>
        </div>
      </footer>
    {/*</nav>*/}
  </React.Fragment>
};

export default hot(Footer);
