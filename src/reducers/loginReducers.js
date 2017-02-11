/**
 * Created by hsun on 2017-02-04.
 */

export default function reducer(state={
    // data: {},
    // status: "",
    // fetching: false,
    // fetched: false,
    // error: null,
    loggedIn: false,
    signUp: false,
    email: '',
}, action) {
    switch (action.type) {
        case "LOGIN_SUCCESS": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                loggedIn: true,
                email: action.email,
            }
        }
        case "START_SIGNUP": {
            return {...state, signUp: true}
        }
        case "FINISH_SIGNUP": {
            return {...state, signUp: false}
        }
    }
    return state
}