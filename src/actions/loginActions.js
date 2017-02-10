/**
 * Created by hsun on 2017-02-04.
 */

import { message } from "antd";
import axios from "axios";
import env from '../envConfigure'
const baseURI = env.localdev;


export function login(data) {
    // console.log(id);
    return function(dispatch) {
        axios({
            baseURL: baseURI,
            url: '/login',
            method: 'post',
            data: {
                data,
            },
        }).then((res) => {
            message.success('Login Succeed', 3);
            console.log('login success!!!!', res);
            dispatch({type: "LOGIN_SUCCESS", payload: res})
        }).catch((err) => {
            message.error('Login Failed', 8);
            dispatch({type: "LOGIN_FAILED", payload: err})
        });
    }
}


export function startSignUp() {
    return function(dispatch) {
        dispatch({type: "START_SIGNUP"})
    }
}

export function finishSignUp() {
    return function(dispatch) {
        dispatch({type: "FINISH_SIGNUP"})
    }
}