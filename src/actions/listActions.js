/**
 * Created by haos on 10/02/2017.
 */
import { message } from "antd";
import axios from "axios";
import env from '../envConfigure';
const baseURI = env.production;

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

export function deleteListing(data) {
    return function(dispatch) {
        axios({
            baseURL: baseURI,
            url: '/del',
            method: 'post',
            data: {data: {_id:data}},
        }).then((res) => {
            message.success('Item successfully deleted', 2);
            dispatch({type: "DELETE_SUCCESS", payload: res})
        }).catch((err) => {
            message.error('Failed to delete item', 5);
            dispatch({type: "DELETE_FAILED", payload: err})
        })
    }
}