//@flow
import React, { Component } from 'react';
import './TextInput.css';

type Props = {
    foo: number,
};
type State = {
    bar: number,
};

class TextInput extends Component<Props, State> {
  render() {
    return (
      <div>

          <span className="input input--nao">
                <input className="input__field input__field--nao" type="text" id="input-1" />
                <label className="input__label input__label--nao" htmlFor="input-1">
                    <span className="input__label-content input__label-content--nao">Username</span>
                </label>
                <svg className="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                    <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                </svg>
            </span>


      </div>
    );
  }
}

export default TextInput;
