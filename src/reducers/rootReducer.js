import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { chessReducer } from "./chessReducer";
import { stateReducer } from "./stateReducer";
import { checkReducer } from "./checkReducer";



export default combineReducers({
    user: userReducer,
    chess: chessReducer,
    chessState: stateReducer,
    check: checkReducer,
});