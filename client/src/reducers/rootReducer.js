import {combineReducers} from 'redux';
import stuff from './stuffReducer';
import {  routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
    stuff,
    router: routerReducer
});

export default rootReducer;