import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { getPosts } from '../../redux/actions/postAction'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'

const AllPosts = ({ post, getPosts }) => {
    useEffect(() => { getPosts() }, [getPosts]);

    return (
        <>
            {post.loading ? <Spinner /> :
                <>
                    <h1 className="large text-primary">Posts</h1>
                    <p className="lead">
                        <i className="fas fs-user"></i>Welcome to the community</p>
                    <PostForm />
                    <div className="posts">
                        {post.posts.map(pos => <PostItem key={pos._id} data={pos} />)}
                    </div>
                </>}
        </>
    );
}
AllPosts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}
export default connect(state => ({
    post: state.post
}), { getPosts })(AllPosts);