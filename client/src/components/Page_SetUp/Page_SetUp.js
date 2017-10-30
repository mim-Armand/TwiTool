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
        this.submitBtn = this.submitBtn.bind(this);
        this.state={
            TWITTER_HANDLE: "",
            TWITTER_CONSUMER_KEY: "",
            TWITTER_CONSUMER_SECRET: "",
            TWITTER_ACCESS_TOKEN_KEY: "",
            TWITTER_ACCESS_TOKEN_SECRET: "",
        }
    }

    formInputChange(event){ //todo: according to the target update the corresponding part of the state
        if( /\S/.test(event.target.value) ) {
            this.setState({
                [event.target.dataset.forval]: event.target.value
            })

        } else this.setState({
            [event.target.dataset.forval]: ""
        })
    }

    submitBtn(){
        let contains_error = false;
        Object.keys(this.state).map((key,index,list)=>{
            if(!this.state[key]) {
                console.error(`the field ${key} is empty!\nAll fields in this form are required.\n\n`);
                contains_error = true;
            }
        })
        if( ! contains_error ) console.info('Now submitting and testing the twitter app creds')
    }

  render() {
    return (
        <div>
            <TextInput onChange={this.formInputChange} val={this.state.TWITTER_HANDLE} forval="TWITTER_HANDLE" placeHolder="Twitter Handle"></TextInput>
            <TextInput onChange={this.formInputChange} val={this.state.TWITTER_CONSUMER_KEY} forval="TWITTER_CONSUMER_KEY" placeHolder="Twitter app Customer Key"></TextInput>
            <TextInput onChange={this.formInputChange} val={this.state.TWITTER_CONSUMER_SECRET} forval="TWITTER_CONSUMER_SECRET" placeHolder="Twitter app Customer Secret"></TextInput>
            <TextInput onChange={this.formInputChange} val={this.state.TWITTER_ACCESS_TOKEN_KEY} forval="TWITTER_ACCESS_TOKEN_KEY" placeHolder="Twitter app Token Key"></TextInput>
            <TextInput onChange={this.formInputChange} val={this.state.TWITTER_ACCESS_TOKEN_SECRET} forval="TWITTER_ACCESS_TOKEN_SECRET" placeHolder="Twitter app Token Secret"></TextInput>

            <div className="btn-grp">
                <button className="button button--naira button--round-s button--border-thin">
                    <i className="button__icon fa fa-question"></i>
                    <span>Help</span>
                </button>
                <button className="button button--naira button--round-s button--border-thin button--naira-up" onClick={this.submitBtn}>
                    <i className="button__icon fa fa-check"></i>
                    <span>Submit</span>
                </button>
            </div>

        </div>
    );
  }
}

export default Page_SetUp;
