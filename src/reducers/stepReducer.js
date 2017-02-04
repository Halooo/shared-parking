/**
 * Created by haos on 27/01/2017.
 */
export default function reducer(state={
    // data: {},
    // status: "",
    // fetching: false,
    // fetched: false,
    // error: null,
    currId: 0
}, action) {
    switch (action.type) {
        case "NEXT_STEP": {
            return {...state, currId: action.currId+1}
        }
    }
    return state
}