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
    loggedIn: false
}, action) {
    switch (action.type) {
        case "LOGIN_SUCCESS": {
            return {...state, loggedIn: true}
        }
    }
    return state
}