import React, { Component } from 'react';
import FirstComponent from './components/learning-examples/FirstComponent';
import SecondComponent from './components/learning-examples/SecondComponent';
import ThirdComponent from './components/learning-examples/ThirdComponent';
import Counter from './components/counter/Counter';
import TodoApp from './components/todo/TodoApp';
import './App.css';
import './bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <TodoApp />
        {/*<Counter />*/}
      </div>
    );
  }
}

class LearningExamples extends Component {
  render() {
    return (
      <div className='learningExamples'>
        My Hello World!!
        <FirstComponent />
        <SecondComponent />
        <ThirdComponent />
      </div>
    );
  }
}

export default App;
