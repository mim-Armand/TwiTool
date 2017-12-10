//@flow
import React, { Component } from 'react';
import './Page_Search.css';
import ProgressBar1 from "../ProgressBar1/ProgressBar1";


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
        <div>
            <h5>add the progress bars etc.</h5>
            <ProgressBar1/>
        </div>
    );
  }
}

export default Page_Search;
