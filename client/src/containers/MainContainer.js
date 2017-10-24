import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as stuffActions from '../actions/stuffActions';
import PropTypes from 'prop-types';
import React from 'react';
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router';
import createHistory from 'history/createBrowserHistory'
import TextInput from "../components/TextInput/TextInput";

const history = createHistory();
class MainContainer extends React.Component {
    componentWillMount() { // HERE WE ARE TRIGGERING THE ACTION
        console.log(this.props)
        this.props.stuffActions.receiveStuff('ttt');

    }

    render() {
        return (
            <div className="">
                <ConnectedRouter history={history}>
                    <Route exact path="/" component={TextInput}/>
                </ConnectedRouter>
                {this.props.test}
            </div>
        );
    }
}
MainContainer.propTypes = {
    stuffActions: PropTypes.object,
    test: PropTypes.any
};
function mapStateToProps(state) {
    console.log('mapStateToProps', state)
    return {
        test: state.stuff.test
    };
}
function mapDispatchToProps(dispatch) {
    return {
        stuffActions: bindActionCreators(stuffActions, dispatch)
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainContainer);
