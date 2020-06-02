const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authCheck = require('../../middleware/auth');
const User = require('../../models/User');
const Post = require('../../models/Posts');

// @route  POST api/posts
// @desc   add posts 
// @access private
router.post('/', [authCheck, [
    check('text', 'No text to save').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({ error: errors.array() }) }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = new Post({
            user: req.user.id,
            text: req.body.text,
            avatar: user.avatar,
            name: user.name
        });

        const newPost = await post.save();
        res.json(newPost);
    } catch (err) {
        return res.status(500).send('Server error')
    }
});
// @route  GET api/posts
// @desc   get all posts 
// @access private

router.get('/', authCheck, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 })
        res.json(posts)
    } catch (error) {
        console.error(error.message)
        return res.status(500).send('Server error')
    }
})
// @route  GET api/posts/:id
// @desc   get post by id 
// @access private

router.get('/:id', authCheck, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).send("Can't find specified post")
        }
        res.json(post)
    } catch (error) {
        if (error.kind == 'ObjectId') { return res.status(400).send("Can't find specified post") };
        console.error(error.message)
        return res.status(500).send('Server error')
    }
})
// @route  DELETE api/posts/:id
// @desc   delete post by id 
// @access private

router.delete('/:id', authCheck, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).send("Can't find specified post")
        }
        //check it is user post
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'You are not authorized to delete' })
        }
        await post.remove();
        res.json({ msg: 'Post removed' });
    } catch (error) {
        if (error.kind == 'ObjectId') { return res.status(400).send("Can't find specified post") };
        console.error(error.message)
        return res.status(500).send('Server error')
    }
})
// @route  PUT api/posts/like/:id
// @desc   like post by user id 
// @access private

router.put('/like/:id', authCheck, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' })
        }
        //check it is user post

        post.likes.unshift({ user: req.user.id });
        await post.save()
        res.json(post.likes);
    } catch (error) {
        if (error.kind == 'ObjectId') { return res.status(400).send("Can't find specified post") };
        console.error(error.message)
        return res.status(500).send('Server error')
    }
})
// @route  PUT api/posts/unlike/:id
// @desc   unlike post by user id 
// @access private

router.put('/unlike/:id', authCheck, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post has no yet been liked' })
        }
        const index = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(index, 1);
        await post.save()
        res.json(post.likes);
    } catch (error) {
        if (error.kind == 'ObjectId') { return res.status(400).send("Can't find specified post") };
        console.error(error.message)
        return res.status(500).send('Server error')
    }
})
// @route  POST api/posts/comment/:id
// @desc   add comment 
// @access private
router.post('/comment/:id', [authCheck, [
    check('text', 'No text to save').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({ error: errors.array() }) }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);
        const newComment = {
            user: req.user.id,
            text: req.body.text,
            avatar: user.avatar,
            name: user.name
        };

        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);
    } catch (err) {
        return res.status(500).send('Server error')
    }
});
// @route  DELETE api/posts/comment/:id/:com_id
// @desc   delete comment 
// @access private

router.delete('/comment/:id/:com_id', authCheck, async (req, res) => {

    try {
        const post = await Post.findById(req.params.id)
        const comment = post.comments.find(comment => comment.id === req.params.com_id);
        if (!comment) {
            return res.status(404).json({ msg: 'comment not found' });
        }
        //check it is user comment
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'You are not authorized to delete' })
        }
        //remove comment
        const index = post.comments.map(com => com.id.toString()).indexOf(req.params.com_id);

        post.comments.splice(index, 1);
        await post.save()
        res.json(post.comments);
    } catch (error) {
        if (error.kind == 'ObjectId') { return res.status(400).send("Can't find specified comment") };
        console.error(error.message)
        return res.status(500).send('Server error')
    }
});

module.exports = router;