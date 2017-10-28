//@flow
import React, { Component } from 'react';
import './Page_SetUp.css';
import TextInput from "../TextInput/TextInput";


type Props = {
    foo: number,
    click: null
};
type State = {
    bar: number,
};

class Page_SetUp extends Component<Props, State> {

    constructor(props){
        super(props);
        this.formInputChange = this.formInputChange.bind(this);
        this.state={
            text_val_1: ""
        }
    }

    formInputChange(event){ //todo: according to the target update the corresponding part of the state
        this.setState({
            text_val_1: event.target.value
        })
        console.log(event.target.value)
    }

  render() {
    return (
        <div>
            <TextInput onChange={this.formInputChange} val={this.state.text_val_1} placeHolder="Twitter Handle"></TextInput>
            <TextInput placeHolder="API KEY"></TextInput>
            <TextInput placeHolder="test"></TextInput>
            <TextInput placeHolder="test"></TextInput>
            <TextInput placeHolder="test"></TextInput>

            <div className="btn-grp">
                <button className="button button--naira button--round-s button--border-thin">
                    <i className="button__icon fa fa-question"></i>
                    <span>Help</span>
                </button>
                <button className="button button--naira button--round-s button--border-thin button--naira-up">
                    <i className="button__icon fa fa-check"></i>
                    <span>Submit</span>
                </button>
            </div>

        </div>
    );
  }
}

export default Page_SetUp;
