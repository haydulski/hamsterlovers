import React, { useState } from 'react';
// import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/alert';
import { register } from '../../redux/actions/authAction';
import PropTypes from 'prop-types';

const Register = ({ isAuth, setAlert, register }) => {
    const [dataForm, setData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })
    const { name, email, password, password2 } = dataForm;

    const onChange = e => {
        setData({ ...dataForm, [e.target.name]: e.target.value })
    }

    //post for register
    const handleSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Password do not match', 'danger')
            return console.log('Passwords do not match');
        } else {
            register({ name, email, password })
        }
    }
    if (isAuth) return (<Redirect to="/dashboard" />)
    return (
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" action="create-profile.html" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} />
                    <small className="form-text">This site generate random avatars so don't be suprised</small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                        value={password2}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </>
    );

}
Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuth: PropTypes.bool,
}

export default connect(state => ({
    isAuth: state.auth.isAuthenticated,
}),
    { setAlert, register })(Register);