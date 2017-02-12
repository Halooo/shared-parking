/**
 * Created by hsun on 2017-02-05.
 */
export default function reducer(state={
    status: "",
    fetching: false,
    fetched: false,
    error: null,
    data: null,
}, action) {
    switch (action.type) {
        case "CREATE_SUCCESS": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload,
            }
        }
        case "CREATE_FAILED": {
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        }
    }
    return state
}