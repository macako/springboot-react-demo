import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import AuthenticationService from './AuthenticationService.js';

class HeaderComponent extends Component {
  render() {
    const isUserLoggedIn = AuthenticationService.isUserLogged();

    return (
      <header>
        <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
          <div>
            <a href='#' className='navbar-brand'>
              macakosoft
            </a>
          </div>
          <ul className='navbar-nav'>
            <li>
              {isUserLoggedIn && (
                <Link className='nav-link' to='/welcome/macako'>
                  Home
                </Link>
              )}
            </li>
            <li>
              {isUserLoggedIn && (
                <Link className='nav-link' to='/todos'>
                  Todos
                </Link>
              )}
            </li>
          </ul>
          <ul className='navbar-nav navbar-collapse justify-content-end'>
            <li>
              {!isUserLoggedIn && (
                <Link className='nav-link' to='/login'>
                  Login
                </Link>
              )}
            </li>
            <li>
              {isUserLoggedIn && (
                <Link
                  className='nav-link'
                  onClick={AuthenticationService.logout}
                  to='/logout'
                >
                  Logout
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default withRouter(HeaderComponent);
