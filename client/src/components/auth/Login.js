import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
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
        const loginUser = { email, password }
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWVkNzc0MTI0YjBjNWEwNjkwM2FkZWIyIn0sImlhdCI6MTU5MTE3ODI1OSwiZXhwIjoxNTkxNTM4MjU5fQ.G4b_z4VAemRnhI3soRjjqSat5bWJIw8FUH33E9I5l3U'
                }
            }
            const body = JSON.stringify(loginUser)

            const res = await axios.post('api/auth', body, config);
            console.log(res.data);
            setData({
                email: "",
                password: "",
            })
        } catch (error) {
            console.log(error.response.data);
        }
    }

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

export default Login;