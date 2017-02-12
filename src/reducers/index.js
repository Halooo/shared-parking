import { combineReducers } from "redux";

import steps from "./stepReducer";
import login from "./loginReducers";
import signup from "./signupReducer";
import list from "./listReducer";
import create from "./createReducer";

export default combineReducers({
    steps,
    login,
    signup,
    list,
    create,
});
