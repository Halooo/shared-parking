/**
 * Created by haos on 10/02/2017.
 */

export default function reducer(state={
    data: {},
    status: "",
    fetching: false,
    fetched: false,
    error: null,
    validationErr: null,
    signedUp: false
}, action) {
    switch (action.type) {
        case "VALIDATION_FAILED": {
            return {...state, fetching: false, validationErr: action.payload}
        }
        case "SIGNUP": {
            return {...state, fetching: true}
        }
        case "SIGNUP_REJECTED": {
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        }
        case "SIGNUP_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                signedUp: true
            }
        }
    }
    return state
}