const express = require('express');
const router = express.Router();
const authCheck = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

// @route  get/api/profile/me
// @desc   profile route for authenticate user
// @access public
router.get('/me', authCheck, async (req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            res.status(400).json({ msg: 'There is no profile for this user' })
        }
        res.json(profile)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
    res.send('Profile route')
});

// @route  POST api/profile/me
// @desc   profile route for authenticate user
// @access private

router.post('/', [authCheck, [
    check('status', 'Status is requried').not().isEmpty(),
    check('skills', 'Skills are required ').not().isEmpty()
]], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    //build profile object
    const {
        company,
        location,
        website,
        bio,
        skills,
        status,
        githubusername,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook
    } = req.body;

    const profileFields = {
        user: req.user.id,
        company,
        location,
        website: website === '' ? '' : normalize(website, { forceHttps: true }),
        bio,
        skills: Array.isArray(skills)
            ? skills
            : skills.split(',').map((skill) => ' ' + skill.trim()),
        status,
        githubusername
    };
    //building social objects
    const socialfields = { youtube, twitter, instagram, linkedin, facebook };

    for (const [key, value] of Object.entries(socialfields)) {
        if (value && value.length > 0)
            socialfields[key] = normalize(value, { forceHttps: true });
    }
    profileFields.social = socialfields;
    //find&update profile
    try {

        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            profile = await Profile.findByIdAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile)
        }
        //Create new profile
        profile = new Profile(profileFields)
        await profile.save();
        res.json(profile)
    } catch (error) {
        res.status(500).send('Profile update error')
    }
})

// @route  GET api/profile
// @desc   get all profiles
// @access public

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles)
    } catch (error) {
        res.status(500).send('Server of profiles error')
    }
})
// @route  GET api/profile/user/user_id
// @desc   get one user profile
// @access public

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if (!profile) return res.status(400).send('There is no user with that id');
        return res.json(profile)
    } catch (error) {
        if (error.kind == 'ObjectId') { return res.status(400).send('There is no user with that id') };
        console.error(error.message)
        res.status(500).send('Server of profiles error')
    }
})

// @route  DELETE api/profile
// @desc   delete specific profile and user
// @access private

router.delete('/', authCheck, async (req, res) => {
    try {
        await Profile.findOneAndDelete({ user: req.user.id });
        await User.findOneAndDelete({ _id: req.user.id });
        return res.send('User deleted');
    } catch (error) {
        res.status(500).send('Server error, delete canceled.')
    }
})

module.exports = router;