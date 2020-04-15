import React, { Component } from 'react';
import TodoDataService from '../../api/todo/TodoDataService.js';
import AuthenticationService from './AuthenticationService.js';

class TodosComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      message: null
    };

    this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
    this.refreshTodos = this.refreshTodos.bind(this);
  }

  deleteTodoClicked(id) {
    let username = AuthenticationService.getLoggedInUserName();
    TodoDataService.deleteTodo(username, id)
      .then(response => {
        this.setState({ message: `Delete of todo ${id} successful.` });
        this.refreshTodos();
      })
      .catch(error =>
        this.setState({ message: `Delete of todo ${id} failed.` })
      );
  }

  refreshTodos() {
    let username = AuthenticationService.getLoggedInUserName();
    TodoDataService.retrieveAllTodos(username)
      .then(response => this.setState({ todos: response.data }))
      .catch(error => {
        if (error.response) {
          this.setState({ message: error.response.data.message });
        } else {
          this.setState({ message: error.toString() });
        }
      });
  }

  componentDidMount() {
    this.refreshTodos();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <h1>List Todos</h1>
        {this.state.message && (
          <div className='alert alert-success'>{this.state.message}</div>
        )}
        <div className='container'>
          <table className='table'>
            <thead>
              <tr>
                <th>description</th>
                <th>target date</th>
                <th>is completed?</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map(todo => (
                <tr key={todo.id}>
                  <td>{todo.description}</td>
                  <td>{todo.done.toString()}</td>
                  <td>{todo.targetDate.toString()}</td>
                  <td>
                    <button
                      className='btn btn-warning'
                      onClick={() => this.deleteTodoClicked(todo.id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default TodosComponent;
