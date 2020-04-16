import React, { Component } from 'react';
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TodoDataService from '../../api/todo/TodoDataService.js';
import AuthenticationService from './AuthenticationService.js';

class TodoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      description: '',
      targetDate: moment(new Date()).format('YYYY-MM-DD'),
      message: null
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    let { id } = this.state;

    if (id === -1) {
      return;
    }

    let username = AuthenticationService.getLoggedInUserName();

    TodoDataService.retrieveTodo(username, id)
      .then(response => {
        let { description, targetDate } = response.data;
        this.setState({
          description: description,
          targetDate: moment(targetDate).format('YYYY-MM-DD')
        });
      })
      .catch(error => {
        if (error.response) {
          this.setState({ message: error.response.data.message });
        } else {
          this.setState({ message: error.toString() });
        }
      });
  }

  onSubmit(values) {
    let username = AuthenticationService.getLoggedInUserName();
    let { description, targetDate } = values;
    let { id } = this.state;
    let todo = { id, description, targetDate };
    let request = null;

    if (id === -1) {
      request = TodoDataService.createTodo(username, todo);
    } else {
      request = TodoDataService.updateTodo(username, id, todo);
    }

    request
      .then(() => this.props.history.push('/todos'))
      .catch(error => {
        if (error.response) {
          this.setState({ message: error.response.data.message });
        } else {
          this.setState({ message: error.toString() });
        }
      });
  }

  validate(values) {
    let { description, targetDate } = values;
    let errors = {};
    if (!description) {
      errors.description = 'Enter a description';
    } else if (description.length < 5) {
      errors.description = 'Enter atleast 5 characters';
    }

    if (!moment(targetDate).isValid()) {
      errors.targetDate = 'Enter a valid target date';
    }

    return errors;
  }

  render() {
    let { description, targetDate, message } = this.state;

    return (
      <div>
        <h1>Todo</h1>
        {message && <div className='alert alert-danger'>{message}</div>}
        <div className='container'>
          <Formik
            initialValues={{ description, targetDate }}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
            enableReinitialize={true}
          >
            {props => (
              <Form>
                <ErrorMessage
                  name='description'
                  component='div'
                  className='alert alert-warning'
                />
                <ErrorMessage
                  name='targetDate'
                  component='div'
                  className='alert alert-warning'
                />
                <fieldset className='form-group'>
                  <label>description</label>
                  <Field
                    className='form-control'
                    type='text'
                    name='description'
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <label>target date</label>
                  <Field
                    className='form-control'
                    type='date'
                    name='targetDate'
                  />
                </fieldset>
                <button className='btn btn-success' type='submit'>
                  save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default TodoComponent;
