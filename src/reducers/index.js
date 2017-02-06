import { combineReducers } from "redux";

import steps from "./stepReducer";
import login from "./loginReducers";

export default combineReducers({
    steps,
    login
});
