//@flow
import React, { Component } from 'react';
import './App.css';
import TextInput from './components/TextInput/TextInput'
import Steps from "./components/Steps/Steps";
import WindowBar from "./components/WindowBar/WindowBar";
import MainContainer from "./containers/MainContainer";

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
          <MainContainer></MainContainer>
          <WindowBar/>
          <Steps/>
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
