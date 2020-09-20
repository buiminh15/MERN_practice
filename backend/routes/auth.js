var express = require('express');
var passport = require('passport');
var router = express.Router();

// @desc  Auth with Google
// @route GET /auth/google
// scope: https://developers.google.com/identity/protocols/oauth2/scopes#firebasedynamiclinks
// Google Sign-in

router.get('/google', passport.authenticate('google', { scope: ['profile', ] }));

// @desc  Google auth callback
// @route GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}),
(req,res)=> {
    res.redirect('/dashboard')
});

// @desc  Logout user
// @route GET /auth/logout
// Với từng request passport gắn thêm cho bạn 4 hàm:
//https://viblo.asia/p/passport-trong-nodejs-authentication-1VgZvwdrlAw
router.get(
  '/logout',
    (req,res)=> {
        req.logout()
        res.redirect('/')
    }
);
module.exports = router;
