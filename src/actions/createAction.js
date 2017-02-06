/**
 * Created by hsun on 2017-02-05.
 */
import { message } from "antd";

export function createPass(data) {
    // console.log(id);
    return function(dispatch) {
        if (data) {
            dispatch({type: "CREATE_SUCCESS"})
        }
        else {
            message.error('Login Failed', 3000)
        }

    }
}