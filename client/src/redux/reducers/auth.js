import {
    REGISTER_FAILURE, REGISTER_SUCCESS,
    USER_LOADED, AUTH_FAILURE,
    LOGIN_SUCCESS, LOGIN_FAIL,
    LOGOUT, ACOUNT_DELETED
} from '../actions/types'

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
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case LOGOUT:
        case ACOUNT_DELETED:
        case AUTH_FAILURE:
        case LOGIN_FAIL:
        case REGISTER_FAILURE:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }

        default:
            return state;
    }
}