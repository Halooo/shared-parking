/**
 * Created by hsun on 2017-02-05.
 */
import { message } from "antd";
import axios from "axios";
import env from '../envConfigure';
const baseURI = env.localdev;

export function createPass(data) {
    // console.log(id);
    return function(dispatch) {
        axios({
            baseURL: baseURI,
            url: '/create',
            method: 'post',
            data: {
                data,
            },
        }).then((res) => {
            message.success('Created', 3);
            dispatch({type: "LOGIN_SUCCESS", payload: res})
        }).catch((err) => {
            message.error('Failed to Create', 8);
            dispatch({type: "LOGIN_FAILED", payload: err})
        });
        if (data) {
            dispatch({type: "CREATE_SUCCESS"})
        }
        else {
            message.error('Login Failed', 8)
        }

    }
}