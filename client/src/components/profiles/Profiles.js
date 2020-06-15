import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { allProfiles } from '../../redux/actions/profileAction';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = ({ allProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        allProfiles()
    }, [allProfiles])

    return (
        <>
            {loading ?
                <Spinner /> :
                <>
                    <h1 className="large text-primary">All hamster lovers</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop"></i>Browse members
         </p>
                    <div className="profiles">
                        {profiles.length > 0 ? (profiles.map(pro => (<ProfileItem key={pro._id} profile={pro} />))) :
                            (<h4>No profiles found...</h4>)
                        }
                    </div>
                </>}
        </>
    );
}
Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    allProfiles: PropTypes.func.isRequired,
}
export default connect(state => ({
    profile: state.profile
}), { allProfiles })(Profiles);