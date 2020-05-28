const express = require('express');
const router = express.Router();
const authCheck = require('../../middleware/auth');

// @route  get/api/auth
// @desc   test auth route
// @access public
router.get('/', authCheck, (req, res) => {
    res.send('Auth route')
});

module.exports = router;