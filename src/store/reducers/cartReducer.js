import {ActionTypes} from "../constants/action-types";

const initState = {
    items: []
}

export const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ITEM:
            return { ...state, items: [...state.items, action.payload] };
        case ActionTypes.REMOVE_ITEM:
            return { ...state, items: state.items.filter(item => item !== action.payload) };
        case ActionTypes.CHANGE_ITEM:
            let index = state.items.findIndex(item => item.id === action.payload.id); //finding index of the item
            let newArray = [...state.items]; //making a new array
            newArray[index].count = action.payload.count; //changing value in the new array
            return { ...state, items: newArray };
        default:
            return state;
    }
}