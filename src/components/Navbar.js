import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { DrizzleContext } from "drizzle-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

class Navbar extends Component {
  render() {
    const { drizzleState, initialized } = this.context;

    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <div className="brand-wrapper">
            <Link to={'/'} className="navbar-brand">Vulcan Swap <span role="img" aria-label="vulcan-hand">🖖</span></Link>
            <div className="slogan">"Go long and prosper"</div>
          </div>
          {initialized &&
            <div className="accountWrapper">
              <div className="accountAddress">
                <FontAwesomeIcon icon={faUser} />
                {drizzleState.accounts[0]}
              </div>
            </div>
          }
        </div>
      </nav>
    );
  }
}

Navbar.contextType = DrizzleContext.Context;

export default Navbar;
