//@flow
import React, { Component } from 'react';
import './App.css';
import TextInput from './components/TextInput/TextInput'

type Props = {
    foo: number,
};
type State = {
    bar: number,
};

class App extends Component<Props, State> {
  render() {
    return (
      <div className="App">
          <TextInput/>
        {/*<header className="App-header">*/}
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          {/*<h1 className="App-title">Welcome to React</h1>*/}
        {/*</header>*/}
        {/*<p className="App-intro">*/}
          {/*To get started, edit <code>src/App.js</code> and save to reload.*/}
        {/*</p>*/}
      </div>
    );
  }
}

export default App;
