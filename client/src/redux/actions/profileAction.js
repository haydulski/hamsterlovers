import { PROFILE_ERROR, GET_PROFILE, UPDATE_PROFILE } from './types';
import axios from 'axios';
import { setAlert } from "./alert";

export const getProfile = () => async dispatch => {

    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const createProfile = (formData, history, edit = false) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/profile', formData, config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'))
        if (!edit) history.push('/dashboard')
    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
//update of experience
export const updateExperience = (formData, history) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience updated', 'success'))
        history.push('/dashboard')

    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
//update of education
export const updateEducation = (formData, history) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/education', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education updated', 'success'))
        history.push('/dashboard')

    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}