import initialState from './initialState';
import {FETCH_STUFF, RECEIVE_STUFF, UPDATE_STUFF_STATE} from '../actions/actionTypes';

export default function stuff(state = initialState, action) {
    let newState;
    switch (action.type) {
        case FETCH_STUFF:
            console.log('FETCH_STUFF Action')
            return action;
        case RECEIVE_STUFF:
            console.log('state', state)
            newState = {...state, test:action.test};
            console.log('newState', newState)
            console.log('RECEIVE_STUFF Action')
            return newState;
        case UPDATE_STUFF_STATE:
            // console.log('UPDATE_STUFF_STATE action <=====================', action.payload, state)
            return Object.assign({}, state, action.payload);
        default:
            console.log('default reducer')
            return state;
    }
}