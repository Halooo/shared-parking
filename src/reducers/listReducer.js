/**
 * Created by haos on 10/02/2017.
 */
export default function reducer(state={
    status: "",
    fetching: false,
    fetched: false,
    error: null,
    data: null,
}, action) {
    switch (action.type) {
        case "LIST_ALL_SUCCESS": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload,
            }
        }
        case "LIST_ALL_FAILED": {
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        }
    }
    return state
}