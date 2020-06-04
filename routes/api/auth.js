const express = require('express');
const router = express.Router();
const authCheck = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const config = require('config');

// @route  get/api/auth
// @desc   authenticate user route
// @access public
router.get('/', authCheck, async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user })
    } catch (error) {
        res.status(500).send('Auth verification error')
    }

});

// @route  get/api/auth
// @desc   users login route
// @access public
router.post('/', [
    check('email', 'Please insert correct email').isEmail(),
    check('password', 'Password is required').exists()
],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { password, email } = req.body;
        try {
            //check duplicates
            let user = await User.findOne({ email });
            if (!user) {
                res.status(400).json({
                    errors: [{ msg: 'Invalid login or password ' }]
                })
            }

            //check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(400).json({
                    errors: [{ msg: 'Invalid login or password' }]
                })
            }

            //make unique user token
            let payload = { user: { id: user.id } }
            jwt.sign(payload, config.get('jwtSecret'),
                { expiresIn: '2h' },
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