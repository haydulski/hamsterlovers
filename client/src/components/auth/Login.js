import React, { useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/authAction';
import PropTypes from 'prop-types';

const Login = ({ isAuth, login }) => {
    const [dataForm, setData] = useState({
        email: "",
        password: "",
    })
    const { email, password } = dataForm;

    const onChange = e => {
        setData({ ...dataForm, [e.target.name]: e.target.value })
    }

    //post for register
    const handleSubmit = async e => {
        e.preventDefault();
        login(email, password)
    }
    if (isAuth) return (<Redirect to="/dashboard" />)
    return (
        <>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i>Login to Account</p>
            <form className="form" action="create-profile.html" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} />
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
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </>
    );
}
Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuth: PropTypes.bool,
}
export default connect(state => ({
    isAuth: state.auth.isAuthenticated,
}), { login })(Login);