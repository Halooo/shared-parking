/**
 * Created by haos on 30/01/2017.
 */

export function setCurrStep(id) {
    // console.log(id);
    return function(dispatch) {
        dispatch({type: "NEXT_STEP", currId: id})
    }
}