import { REGISTER_FAILURE, REGISTER_SUCCESS } from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    loading: true,
    isAuthenticated: null,
    user: null,
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenicated: true,
                loading: false
            }
        case REGISTER_FAILURE:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenicated: false,
                loading: false
            }

        default:
            return state;
    }
}