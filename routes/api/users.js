const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const randomProfile = require('random-profile-generator');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route  get/api/users
// @desc   users route
// @access public
router.post('/', [
    check('name', 'Please enter correct name').not().isEmpty(),
    check('email', 'Please insert correct email').isEmail(),
    check('password', 'Please create at least 6 characters password').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, password, email } = req.body;
    try {
        //check duplicates
        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({
                errors: [{ msg: 'User exist already' }]
            })
        }
        //get user random avatar
        let avatar = randomProfile.avatar();
        user = new User({
            name,
            email,
            avatar,
            password
        })
        //encrypt a password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        //make unique user token
        let payload = { user: { id: user.id } }
        jwt.sign(payload, config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) console.log(err);
                res.json({ token });
            }
        );
        // res.send('User registered')
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Users server error');
    }
});

module.exports = router;