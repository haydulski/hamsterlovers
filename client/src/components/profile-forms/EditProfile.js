import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createProfile, getProfile } from '../../redux/actions/profileAction';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EditProfile = ({ profile: { profile, loading }, createProfile, getProfile, history }) => {
    const [formData, setFormData] = useState({
        motto: '',
        location: '',
        bio: '',
        youtube: '',
        twitter: '',
        instagram: '',
        facebook: ''
    });
    useEffect(() => {
        getProfile();
        setFormData({
            motto: loading || !profile.motto ? '' : profile.motto,
            location: loading || !profile.location ? '' : profile.location,
            bio: loading || !profile.bio ? '' : profile.bio,
            youtube: loading || !profile.social.youtube ? '' : profile.social.youtube,
            twitter: loading || !profile.social.twitter ? '' : profile.social.twitter,
            instagram: loading || !profile.social.instagram ? '' : profile.social.instagram,
            facebook: loading || !profile.social.facebook ? '' : profile.social.facebook,
        })
    }, [loading, getProfile]);

    const { motto,
        location,
        bio,
        youtube,
        twitter,
        instagram,
        facebook } = formData;



    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const [visibleSocials, toggleVisibleSocials] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log({ ...formData });
        createProfile(formData, history, true)
    }
    return (
        <>
            <h1 className="large text-primary">
                Create Your Profile
      </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
            <small>* = required field</small>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="Motto" name="motto" value={motto} onChange={handleInput} />
                    <small className="form-text">Could be your own  or one you heard</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={handleInput} />
                    <small className="form-text">City & state suggested (eg. Boston, MA)</small>
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={handleInput}></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                    <button type="button" className="btn btn-light" onClick={() => toggleVisibleSocials(!visibleSocials)}>
                        Add Social Network Links
          </button>
                    <span>Optional</span>
                </div>
                {visibleSocials ? (
                    <>
                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"></i>
                            <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={handleInput} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={handleInput} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={handleInput} />
                        </div>
                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"></i>
                            <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={handleInput} />
                        </div>
                    </>
                ) :
                    (null)}

                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </>
    );
}
EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}
export default connect(state => ({
    profile: state.profile
}), { createProfile, getProfile })(EditProfile);