import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
    return (
        <Route {...rest}
            render={props => !auth.isAuthenticated && !auth.loading ? (<Redirect to="/login" />)
                : (<Component {...props} />)
            } />
    );
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

export default connect(state => ({
    auth: state.auth
}), null)(PrivateRoute);