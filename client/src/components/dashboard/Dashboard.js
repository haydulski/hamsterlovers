import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfile } from '../../redux/actions/profileAction';
import Spinner from '../../components/layout/Spinner';


const Dashboard = ({ auth, profile, getProfile }) => {
    useEffect(() => {
        getProfile()
    }, [])
    return profile.loading && profile.profile === null ? <Spinner /> :
        <>
            <h1 className='large text-primary'>Dashboard</h1>
            <p className="lead"><i className="fas fa-user"></i>Welcome {auth.user && auth.user.user.name}</p>
        </>
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