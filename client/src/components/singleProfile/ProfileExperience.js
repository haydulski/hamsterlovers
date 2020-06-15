import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileExperience = ({
  experience: { hamstername, species, current, to, from, description }
}) => (
    <div>
      <h3 className="text-dark">{hamstername}</h3>
      <p>
        <Moment format="DD/MM/YYYY">{moment.utc(from)}</Moment> -{' '}
        {current ? ' Now' : <Moment format="DD/MM/YYYY">{moment.utc(to)}</Moment>}
      </p>
      <p>
        <strong>Species: </strong> {species}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </div>
  );

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired
};

export default ProfileExperience;
