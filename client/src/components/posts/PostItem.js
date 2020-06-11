import React from 'react';
import Moment from 'react-moment'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const PostItem = ({ data: { _id, text, name, avatar, user, likes, comments, date }, auth }) => {
    return (
        <>
            <div className='post bg-white p-1 my-1'>
                <div>
                    <Link to={`/profile/${user}`}>
                        <img className='round-img' src={avatar} alt='' />
                        <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p className='my-1'>{text}</p>
                    <p className='post-date'>
                        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                    </p>

                    {true && (
                        <>
                            <button
                                type='button'
                                className='btn btn-light'
                            >
                                <i className='fas fa-thumbs-up' />{' '}
                                <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                            </button>
                            <button

                                type='button'
                                className='btn btn-light'
                            >
                                <i className='fas fa-thumbs-down' />
                            </button>
                            <Link to={`/posts/${_id}`} className='btn btn-primary'>
                                Discussion{' '}
                                {comments.length > 0 && (
                                    <span className='comment-count'>{comments.length}</span>
                                )}
                            </Link>
                            {!auth.loading && user === auth.user.user._id && (
                                <button
                                    type='button'
                                    className='btn btn-danger'
                                >
                                    <i className='fas fa-times' />
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
PostItem.propTypes = {
    data: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}
export default connect(state => ({
    auth: state.auth
}), null)(PostItem);