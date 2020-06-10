import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateEducation } from '../../redux/actions/profileAction';

const AddEdu = ({ updateEducation, history }) => {

    const [formData, setForm] = useState({
        degree: '', school: '', current: false, from: '', to: '', fieldofstudy: '', description: ''
    })
    const { school, degree, from, to, current, fieldofstudy, description } = formData;
    const handleInput = (e) => {
        setForm({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        updateEducation(formData, history);
    }
    return (
        <>
            <h1 className="large text-primary">
                Add Your Education
      </h1>
            <p className="lead">
                <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
            <small>* = required field</small>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* School or Bootcamp"
                        name="school"
                        value={school}
                        required
                        onChange={handleInput}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Degree or Certificate"
                        name="degree"
                        value={degree}
                        required
                        onChange={handleInput}
                    />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field Of Study" name="fieldofstudy" value={fieldofstudy} onChange={handleInput} />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={handleInput} />
                </div>
                <div className="form-group">
                    <p>
                        <input type="checkbox" name="current" value={current} onClick={(e) => setForm({ ...formData, current: !current })} /> Current School or Bootcamp
          </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={handleInput} />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        value={description}
                        cols="30"
                        rows="5"
                        placeholder="Program Description"
                        onChange={handleInput}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </>
    );
}
AddEdu.propTypes = {
    updateEducation: PropTypes.func.isRequired,
}
export default connect(null, { updateEducation })(AddEdu);