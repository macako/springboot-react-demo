import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HelloWorldService from '../../api/todo/HelloWorldService.js';

class WelcomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };

    this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  handleSuccessfulResponse(response) {
    this.setState({ message: response.data.message });
  }

  handleError(error) {
    console.log(error);
    if (error.response) {
      this.setState({ message: error.response.data.message });
    } else {
      this.setState({ message: error.toString() });
    }
  }

  render() {
    const helloRequest = () =>
      HelloWorldService.executeHelloWorldService(this.props.match.params.name)
        .then(response => this.handleSuccessfulResponse(response))
        .catch(error => this.handleError(error));

    return (
      <div>
        <h1>Welcome!</h1>
        <div className='container'>
          Welcome {this.props.match.params.name}. You can manage your todos{' '}
          <Link to='/todos'>here</Link>
        </div>
        <button onClick={helloRequest}>ok</button>
        <div className='container'>{this.state.message}</div>
      </div>
    );
  }
}

export default WelcomeComponent;
