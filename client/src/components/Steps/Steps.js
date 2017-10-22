//@flow
import React, { Component } from 'react';
import './Steps.css';

type Props = {
    foo: number,
};
type State = {
    bar: number,
};

class Steps extends Component<Props, State> {
  render() {
    return (
      <div>
          <h3>...</h3>
      </div>
    );
  }
}

export default Steps;
