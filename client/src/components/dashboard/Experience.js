import React from 'react';
import { connect } from 'react-redux';
import { deleteExp } from '../../redux/actions/profileAction';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Experience = ({ experience, deleteExp }) => {
    const exps = experience.map(exp => (
        <tr id={exp._id}>
            <td>{exp.hamstername}</td>
            <td className="hide-sm">{exp.species}</td>
            <td>
                <Moment format='DD/MM/YYYY'>{exp.from}</Moment> -
    {exp.to === null ? (' Now') : (<Moment format='DD/MM/YYYY'>{exp.to}</Moment>)}
            </td>
            <td>
                <button className="btn btn-danger" onClick={
                    () => deleteExp(exp._id)
                }>Delete</button>
            </td>
        </tr>
    ))
    return (
        <>
            <h2 className="my-2">My hamsters</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Hamster name</th>
                        <th className="hide-sm">Species</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{exps}</tbody>
            </table>
        </>
    );
}
Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExp: PropTypes.func.isRequired
}
export default connect(null, { deleteExp })(Experience);