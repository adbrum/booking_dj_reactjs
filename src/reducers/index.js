import {combineReducers} from "redux";
import loginReducer from "./loginReducer"
import bookingReducer from "./bookingReducer"

export default combineReducers({loginReducer, bookingReducer})