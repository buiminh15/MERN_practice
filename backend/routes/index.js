var express = require('express');
var router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
// @desc  Login/landing page
// @route GET /
router.get('/', ensureGuest, function (req, res, next) {
  // res.render('login', {
  //   layout: 'login',
  // });
    res.send('login');
});

// @desc  dashboard page
// @route GET /
router.get('/dashboard',ensureAuth, function (req, res, next) {
  res.render('dashboard');
});

module.exports = router;
