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
    return {type: types.UPDATE_STUFF_STATE, payload: data}
}

export function testTwitterApp(d){
    return (dispatch, getState, { OAuth }) => {
        dispatch(updateStatePartial({isLoading: true}));
        // dispatch(updateStatePartial({handle: d.TWITTER_HANDLE})); // we update the handle already as this is not a part of credentials that needs to be tested before being added to the persisted state
        const url = 'https://api.twitter.com/1.1/account/verify_credentials.json';
        return axios(url, { headers: getOAuth(d, url),  json: true })
            .then( (response) => {
                console.log('Received data from TWITTER!',response.data);
                dispatch(updateStatePartial({isLoading: false}));
                dispatch(updateStatePartial({twitter_app: d}));
                dispatch(updateStatePartial({handle_id: response.data.id}));
                dispatch(updateStatePartial({
                    verify_credentials_response: {
                        ...response.data,
                        ...{timestamp: Date.now()}
                    }
                }));
                dispatch(updateStatePartial({verify_credentials_time: Date.now()}));
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
                dispatch(updateStatePartial({
                    rate_limit_response: {
                        ...response.data,
                        ...{timestamp: Date.now()}
                    }
                }));
                //TODO: show success notification
                dispatch(updateStatePartial({isLoading: false}));
            })
            .catch(function (error) {
                //TODO: show an error message
                console.error(error);
                dispatch(updateStatePartial({isLoading: false}));
            });
    }
}

export function getFollowers(d){
    return ( dispatch, getState ) => {
        dispatch ( updateStatePartial( {isLoading: true } ))
        const url = 'https://api.twitter.com/1.1/followers/ids.json?cursor=-1&screen_name=mim_Armand&count=5';
        return axios(url, { headers: getOAuth(d, url), json: true})
            .then( (response) => {
                console.log('Followers',response.data);
                // dispatch(updateStatePartial({
                //     rate_limit_response: {
                //         ...response.data,
                //         ...{timestamp: Date.now()}
                //     }
                // }));
            })
            .catch(function (error) { console.error(error); }); //TODO: show an error message

        dispatch(updateStatePartial({isLoading: false}));
    }
}

export function getFollowersCycle(){
    return (dispatch, getState ) =>{
        console.info('getFollowersCycle...');
        // * check for twitter app creds and that they verify
        console.info('checking for twitter app creds and that they verify..')
        let t_ = getState().stuff.twitter_app;
        if (t_.TWITTER_CONSUMER_KEY && t_.TWITTER_CONSUMER_SECRET && t_.TWITTER_ACCESS_TOKEN_KEY && t_.TWITTER_ACCESS_TOKEN_SECRET){
            return dispatch( testTwitterApp(t_)).then( ()=>{
                console.info(" ---> If credentials were validated, start an interval to check the limits and get the followers");
                if(getState().stuff.verify_credentials_response.timestamp < Date.now() + 999 ){ // the creds were added recently (probably by the dispatch above^^^) and are OK (they wouldn't be persisted otherwise)!
                    console.info("Now starting an interval and checking for rate limits...");
                    // TODO start the interval and distill the following to it's own action ( so we can use it with dispatch from the interval )
                    return dispatch( checkRateLimits(t_)).then ( ()=>{
                        // if( getState().stuff.rate_limit_response.timestamp > Date.now() + 999 ){
                        // }
                        var remains_ = getState().stuff.rate_limit_response.resources.followers["/followers/ids"]["remaining"];
                        console.info(`Currently remaining rate limit is: `, remains_);
                        if ( remains_ > 15 ){ // <<TODO!
                            console.info(`Now getting the next 5K follower IDs..`);
                            return dispatch( getFollowers(t_)).then( ()=>{
                                console.log("DONE! - - - - - - - - - - - - - - \n we need to persist the followers ids, next cursur, timstamp and what not somewhere!!")

                                // 1. Get the next cursur ( -1 if starts )
                                // 2. Make the call
                                // 3. persist:
                                //    - Follower IDs
                                //    - Next cursur
                                //    - TimeStamp

                                return dispatch( getFollowersCycle());
                            });
                        }else{
                            let reset = new Date(0).setUTCSeconds( getState().stuff.rate_limit_response.resources.followers["/followers/ids"].reset );;
                            console.info( "RATE LIMIT IS REACHED!!!", `Reset in ${( reset - Date.now() ) / 1000 / 60} minutes!` );
                        }
                    })
                }
            })
        }
        // * start an interval for:
        //    1 check the rate limits
        //    2 if rate limit is not hit --> make the call to get followers, otherwise nothing..
        //    3 we need to keep the current cursur in the state as we may have to make many calls to get all the followers ( as we know )
    }
}