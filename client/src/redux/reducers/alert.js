import { SET_ALERT, RESET_ALERT } from '../actions/types';
const initialState = [];

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_ALERT:
            return [...state, payload]
        case RESET_ALERT:
            return state.filter(action => action.id !== payload);
        default:
            return state;
    }
}
