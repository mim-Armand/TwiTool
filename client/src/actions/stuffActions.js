import * as types from './actionTypes';
import crypto from 'crypto-js';
import got from 'got';

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

export function testTwitterApp(d){
    return (dispatch, getState, { OAuth }) => {
        console.log(d)

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

        const url = 'https://api.twitter.com/1.1/account/verify_credentials.json';

        got(url, {
            headers: oauth.toHeader(oauth.authorize({url, method: 'GET'}, token)),
            json: true
        });

        return {type: types.TWITTER_APP_TEST, test: d};
    }
}