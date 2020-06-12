import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import PostItem from '../posts/PostItem'
import { getPost } from '../../redux/actions/postAction'
import Spinner from '../layout/Spinner'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = ({ post: { post, loading }, getPost, match }) => {

    useEffect(() => {
        getPost(match.params.id)
    }, [getPost, match.params.id])
    return (
        <>
            {loading || post === null ? <Spinner /> :
                <>
                    <Link to="/posts" className="btn">
                        Back To Posts </Link>
                    <PostItem data={post} showActions={false} />
                    <CommentForm postId={post._id} />
                    <div className="comments">
                        {post.comments.map(com => <CommentItem key={com._id} data={com} postId={post._id} />)}
                    </div>
                </>}
        </>
    );
}
Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}
export default connect(state => ({
    post: state.post
}), { getPost })(Post);