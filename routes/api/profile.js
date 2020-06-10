const express = require('express');
const router = express.Router();
const authCheck = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const config = require('config');
const request = require('request');
const axios = require('axios');

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
});

// @route  POST api/profile
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
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true, upsert: true }
            );
            return res.json(profile)
        }
        //Create new profile
        profile = new Profile(profileFields)
        await profile.save();
        res.json(profile)
    } catch (error) {
        console.error(err.message);
        res.status(501).send('Profile update error')
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

// @route  PUT api/profile/experience
// @desc   add experience data to specific user
// @access private

router.put('/experience', [authCheck, [
    check('title', 'title is required').not().isEmpty(),
    check('company', 'Company name is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send('Experience data validation error').json({ errors: errors.array() });
    }
    const { title, company, current, from, to, location, description } = req.body;
    const newExp = { title, company, current, from, to, location, description }

    try {

        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (error) {
        res.status(500).send('Server error, experience update canceled.')
    }
})
// @route  DELETE api/profile/experience/:id
// @desc   delete experience data from list of experiences
// @access private

router.delete('/experience/:id', authCheck, async (req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.user.id })
        const removeIndex = profile.experience.map(item => item._id).indexOf(req.params.id);
        if (removeIndex === -1) return res.status(404).json(profile);
        profile.experience.splice(removeIndex, 1);

        await profile.save();
        res.json(profile);
    } catch (error) {
        res.status(500).send('Server error, experience delete canceled.')
    }
})

// @route  PUT api/profile/education
// @desc   add education data to specific user
// @access private
router.put('/education', [authCheck, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree name is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send('Education data validation error').json({ errors: errors.array() });
    }
    const { school, degree, from, to, current, fieldofstudy, description } = req.body;
    const newExp = { school, degree, from, to, current, fieldofstudy, description }

    try {

        const profile = await Profile.findOne({ user: req.user.id });

        profile.education.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (error) {
        res.status(500).send('Server error, education update canceled.')
    }
})
// @route  DELETE api/profile/education/:id
// @desc   delete education data from list of education
// @access private

router.delete('/education/:id', authCheck, async (req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.user.id })
        const removeIndex = profile.education.map(item => item._id).indexOf(req.params.id);
        if (removeIndex === -1) return res.status(404).json(profile);
        profile.education.splice(removeIndex, 1);

        await profile.save();
        res.json(profile);
    } catch (error) {
        res.status(500).send('Server error, education delete canceled.')
    }
})
// @route  GET api/profile/github/:username
// @desc   get github profile
// @access public

router.get('/github/:username', async (req, res) => {

    try {
        const uri = encodeURI(
            `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
        );
        const headers = {
            'user-agent': 'node.js',
            'Authorization': `token ${config.get('githubToken')}`
        };

        const gitHubResponse = await axios.get(uri, { headers });
        return res.json(gitHubResponse.data);
    } catch (err) {
        console.error(err.message);
        return res.status(404).json({ msg: 'No Github profile found' });
    }
})

module.exports = router;