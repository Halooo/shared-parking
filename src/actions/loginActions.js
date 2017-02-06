/**
 * Created by hsun on 2017-02-04.
 */

import { message } from "antd";

export function login(uname, pw) {
    // console.log(id);
    return function(dispatch) {
        if (uname && pw) {
            dispatch({type: "LOGIN_SUCCESS"})
        }
        else {
            message.error('Login Failed', 3000)
        }

    }
}