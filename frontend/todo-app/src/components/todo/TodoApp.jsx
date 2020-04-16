import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute';
import WelcomeComponent from './WelcomeComponent';
import LoginComponent from './LoginComponent';
import ErrorComponent from './ErrorComponent';
import TodosListComponent from './TodosListComponent';
import TodoComponent from './TodoComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import LogoutComponent from './LogoutComponent';

class TodoApp extends Component {
  render() {
    return (
      <div className='TodoApp'>
        <Router>
          <div>
            <HeaderComponent />
            <Switch>
              <Route path='/' exact component={LoginComponent} />
              <Route path='/login' component={LoginComponent} />
              <AuthenticatedRoute
                path='/welcome/:name'
                component={WelcomeComponent}
              />
              <AuthenticatedRoute path='/todos/:id' component={TodoComponent} />
              <AuthenticatedRoute
                path='/todos'
                component={TodosListComponent}
              />
              <AuthenticatedRoute path='/logout' component={LogoutComponent} />
              <Route component={ErrorComponent} />
            </Switch>
            <FooterComponent />
          </div>
        </Router>
      </div>
    );
  }
}

export default TodoApp;
