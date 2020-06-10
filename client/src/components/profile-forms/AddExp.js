import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateExperience } from '../../redux/actions/profileAction';

const AddExp = ({ updateExperience, history }) => {

    const [formData, setForm] = useState({
        title: '', company: '', current: false, from: '', to: '', location: '', description: ''
    })
    const { title, company, current, from, to, location, description } = formData;
    const handleInput = (e) => {
        setForm({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        updateExperience(formData, history);
    }
    return (
        <>
            <h1 className="large text-primary">
                Add An Experience
      </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming positions that you have had in the past</p>
            <small>* = required field</small>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="* Job Title" name="title" required value={title} onChange={handleInput} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Company" name="company" required value={company} onChange={handleInput} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={handleInput} />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={handleInput} />
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" value={current} onClick={(e) => setForm({ ...formData, current: !current })} /> Current Job</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={handleInput} />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        value={description} onChange={handleInput}
                    ></textarea>
                </div>
                <input type="submit" class="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </>
    );
}
AddExp.propTypes = {
    updateExperience: PropTypes.func.isRequired,
}
export default connect(null, { updateExperience })(AddExp);