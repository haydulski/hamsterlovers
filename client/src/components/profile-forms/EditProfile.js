import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createProfile, getProfile } from '../../redux/actions/profileAction';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EditProfile = ({ profile: { profile, loading }, createProfile, getProfile, history }) => {
    const [formData, setFormData] = useState({
        company: '',
        location: '',
        website: '',
        bio: '',
        skills: '',
        status: '',
        githubusername: '',
        youtube: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        facebook: ''
    });
    useEffect(() => {
        getProfile();
        setFormData({
            company: loading || !profile.company ? '' : profile.company,
            location: loading || !profile.location ? '' : profile.location,
            website: loading || !profile.website ? '' : profile.website,
            bio: loading || !profile.bio ? '' : profile.bio,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            status: loading || !profile.status ? '' : profile.status,
            githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
            youtube: loading || !profile.social.youtube ? '' : profile.social.youtube,
            twitter: loading || !profile.social.twitter ? '' : profile.social.twitter,
            instagram: loading || !profile.social.instagram ? '' : profile.social.instagram,
            linkedin: loading || !profile.social.linkedin ? '' : profile.social.linkedin,
            facebook: loading || !profile.social.facebook ? '' : profile.social.facebook,
        })
    }, [loading, getProfile]);

    const { company,
        location,
        website,
        bio,
        skills,
        status,
        githubusername,
        youtube,
        twitter,
        instagram,
        linkedin,
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
                    <select name="status" value={status} onChange={handleInput}>
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">Give us an idea of where you are at in your career</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Company" name="company" value={company} onChange={handleInput} />
                    <small className="form-text">Could be your own company or one you work for</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" value={website} onChange={handleInput} />
                    <small className="form-text">Could be your own or a company website</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={handleInput} />
                    <small className="form-text">City & state suggested (eg. Boston, MA)</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={handleInput} />
                    <small className="form-text">Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Github Username"
                        name="githubusername"
                        value={githubusername}
                        onChange={handleInput}
                    />
                    <small className="form-text">If you want your latest repos and a Github link, include your username</small>
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
                            <i className="fab fa-linkedin fa-2x"></i>
                            <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={handleInput} />
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