import * as types from './actionTypes';

function url() {
    return 'www.url.com';
}

export function receiveStuff(json) {
    console.log('Actions ', json)
    return {type: types.RECEIVE_STUFF, test: json};
    // return {type: types.RECEIVE_STUFF, stuff: json.stuff};
}

export function fetchStuff() {
    return dispatch => {
        return fetch(url(), {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'x-api-key': '',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => dispatch(receiveStuff(json)));
    };
}