import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfile } from '../../redux/actions/profileAction';


const Dashboard = ({ auth, profile, getProfile }) => {
    useEffect(() => {
        getProfile()
    }, [])
    return (
        <>
            Dashboard
        </>
    );
}
Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, { getProfile })(Dashboard);