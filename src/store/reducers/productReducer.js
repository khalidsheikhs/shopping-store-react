import {ActionTypes} from "../constants/action-types";
import data from "../../data.json";

const initState = {
    allProducts: [],
    products: [],
    product: {}
}
export const productReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.SET_ALL_PRODUCTS:
            return { ...state, allProducts: action.payload };
        case ActionTypes.SET_PRODUCTS:
            return { ...state, products: action.payload };
        case ActionTypes.SELECTED_PRODUCT:
            return { ...state, product: action.payload };
        default:
            return state;
    }
}