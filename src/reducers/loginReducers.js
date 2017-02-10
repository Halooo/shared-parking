/**
 * Created by hsun on 2017-02-04.
 */
/**
 * Created by haos on 27/01/2017.
 */

export default function reducer(state={
    // data: {},
    // status: "",
    // fetching: false,
    // fetched: false,
    // error: null,
    loggedIn: false,
    signUp: false,
}, action) {
    switch (action.type) {
        case "LOGIN_SUCCESS": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                loggedIn: true
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