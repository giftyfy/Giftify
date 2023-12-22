const express = require('express');
const router = express.Router();
const userscontrol = require('../Controllers/usersController');
const middleware = require('../Middleware/userAuth');
const jwt = require('jsonwebtoken');
const google = require('../Middleware/googleAuth');
const passport = require('passport');
require('../Controllers/googleAuth');
require('dotenv').config();

router.post('/register', userscontrol.createUser);
router.post('/login', userscontrol.loginUser);
router.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));
router.get('/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/home',
        failureRedirect: '/not',
}));
router.get('/home', middleware.google, (req, res) => {
    res.redirect('http://localhost:3000/');
});
router.get('/not' , (req, res) => {
    res.send('unauthirized');
});

module.exports = router;