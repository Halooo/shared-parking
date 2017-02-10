/**
 * Created by haos on 09/02/2017.
 */
import { message } from "antd";

export function signUp(data) {
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