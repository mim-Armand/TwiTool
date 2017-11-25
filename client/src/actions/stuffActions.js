import * as types from './actionTypes';
import crypto from 'crypto-js';
import axios from 'axios';
import OAuth from 'oauth-1.0a';

function url() {
    return 'www.url.com';
}

function getOAuth(d, url){
    var oauth = OAuth({
        consumer: {
            key: d.TWITTER_CONSUMER_KEY, //'<consumer key>',
            secret: d.TWITTER_CONSUMER_SECRET//'<consumer secret>'
        },
        signature_method: 'HMAC-SHA1',
        hash_function: function(base_string, key) {
            return crypto.enc.Base64.stringify(crypto.HmacSHA1(base_string, key));
        }
    });
    var token = {
        key: d.TWITTER_ACCESS_TOKEN_KEY,
        secret: d.TWITTER_ACCESS_TOKEN_SECRET
    };
    return oauth.toHeader(oauth.authorize({url, method: 'GET'}, token));
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
            // mode: 'cors',
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

export function updateStatePartial(data) {
    console.log('update state action...');
    return {type: types.UPDATE_STUFF_STATE, payload: data}
}

export function testTwitterApp(d){
    return (dispatch, getState, { OAuth }) => {
        dispatch(updateStatePartial({isLoading: true}));
        dispatch(updateStatePartial({handle: d.TWITTER_HANDLE})); // we update the handle already as this is not a part of credentials that needs to be tested before being added to the persisted state
        const url = 'https://api.twitter.com/1.1/account/verify_credentials.json';
        return axios(url, { headers: getOAuth(d, url),  json: true })
            .then( (response) => {
                console.log('Received data from TWITTER!',response.data);
                dispatch(updateStatePartial({isLoading: false}));
                dispatch(updateStatePartial({twitter_app: d}));
                dispatch(updateStatePartial({handle_id: response.data.id}));
                dispatch(updateStatePartial({verify_credentials_response: response.data}));
                //TODO: show success notification
            })
            .catch(function (error) {
                dispatch(updateStatePartial({isLoading: false}));
                //TODO: show an error message
                console.error(error);
            });
    }
}

export function checkRateLimits(d){
    return (dispatch, getState) => {
        dispatch( updateStatePartial( {isLoading: true} ));
        const url = 'https://api.twitter.com/1.1/application/rate_limit_status.json';
        return axios(url, { headers: getOAuth(d, url), json: true})
            .then( (response) => {
                console.log('Rate Limits:',response.data);
                dispatch(updateStatePartial({isLoading: false}));
                dispatch(updateStatePartial({rate_limit_response: response.data}));
                //TODO: show success notification
            })
            .catch(function (error) {
                dispatch(updateStatePartial({isLoading: false}));
                //TODO: show an error message
                console.error(error);
            });
    }
}

export function getFollowersCycle(){
    // * check for twitter app creds and that they verify
    // * start an interval for:
    //    1 check the rate limits
    //    2 if rate limit is not hit --> make the call to get followers, otherwise nothing..
}