import React from 'react';
import { connect } from 'react-redux';
import { deleteEdu } from '../../redux/actions/profileAction';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Education = ({ education, deleteEdu }) => {
    const educ = education.map(edu => (
        <tr id={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>
                <Moment format='DD/MM/YYYY'>{edu.from}</Moment> -
    {edu.to === null ? (' Now') : (<Moment format='DD/MM/YYYY'>{edu.to}</Moment>)}
            </td>
            <td>
                <button className="btn btn-danger" onClick={() => {
                    deleteEdu(edu._id)
                }}>Delete</button>
            </td>
        </tr>
    ))
    return (
        <>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Shool</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{educ}</tbody>
            </table>
        </>
    );
}
Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEdu: PropTypes.func.isRequired
}
export default connect(null, { deleteEdu })(Education);