import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileById } from '../../redux/actions/profileAction';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';

const SingleProfile = ({ match, auth, profile: { profile, loading }, getProfileById }) => {

    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById, match.params.id])
    return (
        <>
            {profile === null ? (<Spinner />) : (<>
                <Link to='/profiles' className='btn btn-light'>Go back</Link>
                {auth.isAuthenticated && auth.loading === false && auth.user.user._id === profile.user._id &&
                    <Link to="/edit-profile" className="btn btn-dark">
                        Edit Profile </Link>}
                <div class="profile-grid my-1">
                    <ProfileTop prof={profile} />
                    <ProfileAbout profile={profile} />
                    <div className="profile-exp bg-white p-2">
                        <h2 className="text-primary">Experience</h2>
                        {profile.experience.length > 0 ? (<>
                            {profile.experience.map((experience) => (
                                <ProfileExperience
                                    key={experience._id}
                                    experience={experience}
                                />
                            ))}
                        </>
                        ) : (<h4>No experience</h4>)}
                    </div>
                    <div className="profile-edu bg-white p-2">
                        <h2 className="text-primary">Education</h2>
                        {profile.experience.length > 0 ? (
                            <>
                                {profile.education.map((edu) => (
                                    <ProfileEducation
                                        key={edu._id}
                                        education={edu}
                                    />
                                ))}
                            </>) : (<h4>No education data</h4>)}
                    </div>
                </div>

            </>)}
        </>
    );
}
SingleProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired
}
export default connect(state => ({
    profile: state.profile,
    auth: state.auth,

}), { getProfileById })(SingleProfile);