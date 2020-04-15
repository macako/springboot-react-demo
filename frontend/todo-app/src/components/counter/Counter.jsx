import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Counter.css';

class Counter extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0
    };
  }

  render() {
    let resetFuction = () =>
      this.setState(previousState => {
        return { counter: 0 };
      });

    let counterFuntion = by =>
      this.setState(previousState => {
        return { counter: previousState.counter + by };
      });

    let counter = this.state.counter;

    return (
      <div>
        <CounterButton counterMethod={counterFuntion} />
        <CounterButton by={5} counterMethod={counterFuntion} />
        <CounterButton by={10} counterMethod={counterFuntion} />
        <span className='count'>{counter}</span>
        <div>
          <button className='reset' onClick={resetFuction}>
            reset
          </button>
        </div>
      </div>
    );
  }
}

class CounterButton extends Component {
  render() {
    let incrementFuction = () => this.props.counterMethod(this.props.by);
    let decrementFuction = () => this.props.counterMethod(-this.props.by);

    return (
      <div>
        <button onClick={incrementFuction}>+{this.props.by}</button>
        <button onClick={decrementFuction}>-{this.props.by}</button>
      </div>
    );
  }
}

CounterButton.defaultProps = {
  by: 1
};

CounterButton.propTypes = {
  by: PropTypes.number
};

export default Counter;
