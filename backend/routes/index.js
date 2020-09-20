var express = require('express');
var router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const Story = require('../models/Story')

// @desc  Login/landing page
// @route GET /
router.get('/', (req, res, next) => {
  res.render('login', {
    layout: 'login',
  });
});

// @desc  dashboard page
// @route GET /
router.get('/dashboard', async (req, res, next) => {
  try {
    const stories = await Story.find({user: req.user.id}).lean()
    res.render('dashboard', {
    name: req.user.firstName,
    stories
    });
  } catch (error) {
    console.error(error)
    res.render('error/500')
  }
});

module.exports = router;
