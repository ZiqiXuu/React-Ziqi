import {activitiesReducer} from './activitiesReducers';
import {combineReducers} from "redux";
import loadingReducer from "./loadingReducer";

export default combineReducers({
    activitiesReducer,loadingReducer}
)