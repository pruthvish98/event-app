import { combineReducers } from "redux";
import EventReducer from "./Event/reducer";

const rootReducer = combineReducers({
    Event: EventReducer,
});

export default rootReducer;
