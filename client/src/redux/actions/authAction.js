import axios from 'axios'
import { REGISTER_SUCCESS, REGISTER_FAILURE } from './types';
import { setAlert } from './alert';

export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: { 'Content-Type': 'application/json', }
    }
    const body = { name, email, password };
    try {
        const res = await axios.post('/api/users', body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
        }
        dispatch({ type: REGISTER_FAILURE })
    }
}