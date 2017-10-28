//@flow
import React, { Component } from 'react';
import './Page_Search.css';


type Props = {
    foo: number,
    click: null
};
type State = {
    bar: number,
};

class Page_Search extends Component<Props, State> {
  render() {
      console.log(this.props)
    return (
        <h1>Page SEARCH!</h1>
    );
  }
}

export default Page_Search;
