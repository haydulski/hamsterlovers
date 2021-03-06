import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateExperience } from '../../redux/actions/profileAction';

const AddExp = ({ updateExperience, history }) => {

    const [formData, setForm] = useState({
        hamstername: '', species: '', current: false, from: '', to: '', description: ''
    })
    const { hamstername, species, current, from, to, description } = formData;
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
                Add your hamsters!
      </h1>
            <p className="lead">
                <i className="fab fa-envira"></i> also any hamsters that you have in past...</p>
            <small>* = required field</small>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="* Hamster name" name="hamstername" required value={hamstername} onChange={handleInput} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Species" name="species" required value={species} onChange={handleInput} />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} required onChange={handleInput} />
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" value={current} onClick={(e) => setForm({ ...formData, current: !current })} /> It still alive ;)</p>
                </div>
                {current ? null : (<div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={handleInput} />
                </div>)}
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="How he is/was like?"
                        value={description} onChange={handleInput}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </>
    );
}
AddExp.propTypes = {
    updateExperience: PropTypes.func.isRequired,
}
export default connect(null, { updateExperience })(AddExp);