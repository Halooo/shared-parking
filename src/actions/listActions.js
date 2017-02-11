/**
 * Created by haos on 10/02/2017.
 */
import { message } from "antd";
import axios from "axios";
import env from '../envConfigure';
const baseURI = env.localdev;

export function listAll () {
    // console.log(id);
    return function(dispatch) {
        axios({
            baseURL: baseURI,
            url: '/list',
            method: 'get',
        }).then((res) => {
            dispatch({type: "LIST_ALL_SUCCESS", payload: res.data})
        }).catch((err) => {
            message.error('Failed to Load List', 5);
            dispatch({type: "LIST_ALL_FAILED", payload: err})
        });
    }
}