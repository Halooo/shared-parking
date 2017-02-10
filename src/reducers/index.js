import { combineReducers } from "redux";

import steps from "./stepReducer";
import login from "./loginReducers";
import signup from "./signupReducer";

export default combineReducers({
    steps,
    login,
    signup,

});
