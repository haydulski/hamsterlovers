import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfile } from '../../redux/actions/profileAction';
import Spinner from '../../components/layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardAtions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { deleteAll } from '../../redux/actions/profileAction';


const Dashboard = ({ auth, profile, getProfile, deleteAll }) => {
    useEffect(() => {
        getProfile()
    }, [getProfile])
    return profile.loading && profile.profile === null ? <Spinner /> :
        <>
            <h1 className='large text-primary'>Dashboard</h1>
            <p className="lead"><i className="fas fa-user"></i>Welcome {auth.user && auth.user.user.name}</p>
            {profile.profile ?
                (<>
                    <DashboardAtions />
                    <Experience experience={profile.profile.experience} />
                    <Education education={profile.profile.education} />
                    <div className="my-2">
                        <button className="btn btn-danger" onClick={() => deleteAll()}>
                            <i className="fas fa-user-minus"></i>  Delete my account
                            </button>
                    </div>
                </>) :
                (<>
                    <p>You don't have profile yet, please add some details</p>
                    <Link to='/create-profile' className='btn btn-primary my-1'>Create profile</Link>
                </>)}
        </>
}
Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired,
    deleteAll: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, { getProfile, deleteAll })(Dashboard);