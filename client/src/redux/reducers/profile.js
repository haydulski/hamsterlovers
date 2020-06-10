import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE } from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    errors: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_PROFILE:
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
            }
        case PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false,
                repos: [],
                errors: {}
            }
        default:
            return state;
    }

}