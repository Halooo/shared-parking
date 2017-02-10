/**
 * Created by haos on 09/02/2017.
 */
import { message } from 'antd';
import axios from 'axios';
import env from '../envConfigure'
const baseURI = env.localdev;

function validation(data) {
    const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const pwValidation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!emailValidation.test(data.email)) {
        return 'Invalid Email';
    }
    console.log(data)
    if (!pwValidation.test(data.pw)) {
        return 'Invalid Password'
    }
    if (data.first.length > 20 || data.last.length > 20) {
        return 'Name Too Long';
    }
    if (data.phone.length > 12) {
        return 'Invalid Phone Number'
    }

    // no error
    return 0;
}

export function signUp(data) {
    // console.log(id);
    return function(dispatch) {
        let validate = validation(data);
        if (validate === 0) {
            axios({
                baseURL: baseURI,
                url: '/signup',
                method: 'post',
                data: {
                    data,
                },
            }).then((res) => {
                message.success('Sign up succeed', 3);
                dispatch({type: "SIGNUP_FULFILLED", payload: res.data})
            }).catch((err) => {
                message.error('Failed to sign up', 8);
                dispatch({type: "SIGNUP_REJECTED", payload: err})
            });
        }
        else {
            dispatch({type: "VALIDATION_FAILED", payload: validate});
        }
    }
}


