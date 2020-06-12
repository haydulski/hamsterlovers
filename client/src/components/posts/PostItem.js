import React from 'react';
import Moment from 'react-moment'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { addLike, removeLike, deletePost } from '../../redux/actions/postAction'

const PostItem = ({
    data: { _id, text, name, avatar, user, likes, comments, date }, auth,
    addLike, removeLike, deletePost, showActions }) => {
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
                        Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
                    </p>

                    {showActions && (
                        <>
                            <button
                                type='button'
                                className='btn btn-light'
                                onClick={() => addLike(_id)}
                            >
                                <i className='fas fa-thumbs-up' />{' '}
                                <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                            </button>
                            <button

                                type='button'
                                className='btn btn-light'
                                onClick={() => removeLike(_id)}
                            >
                                <i className='fas fa-thumbs-down' />
                            </button>
                            <Link to={`/post/${_id}`} className='btn btn-primary'>
                                Discussion{' '}
                                {comments.length > 0 && (
                                    <span className='comment-count'>{comments.length}</span>
                                )}
                            </Link>
                            {!auth.loading && user === auth.user.user._id && (
                                <button
                                    type='button'
                                    className='btn btn-danger'
                                    onClick={() => deletePost(_id)}
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
PostItem.defaultProps = {
    showActions: true
};
PostItem.propTypes = {
    data: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    showActions: PropTypes.bool,
}
export default connect(state => ({
    auth: state.auth
}), { addLike, removeLike, deletePost })(PostItem);