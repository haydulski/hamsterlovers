const express = require('express');
const router = express.Router();

// @route  get/api/posts
// @desc   test posts route
// @access public
router.get('/', (req, res) => {
    res.send('Posts route')
});

module.exports = router;