import {ActionTypes} from "../constants/action-types";

export const addItem = (item) => {
    return {
        type: ActionTypes.ADD_ITEM,
        payload: item
    }
}

export const removeItem = (item) => {
    return {
        type: ActionTypes.REMOVE_ITEM,
        payload: item
    }
}

export const changeItem = (item) => {
    return {
        type: ActionTypes.CHANGE_ITEM,
        payload: item
    }
}