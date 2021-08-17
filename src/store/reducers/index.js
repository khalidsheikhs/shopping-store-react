import {combineReducers} from "redux";
import {productReducer} from "./productReducer";
import {cartReducer} from "./cartReducer";

const reducers = combineReducers({
    productReducer,
    cartReducer
});

export default reducers;