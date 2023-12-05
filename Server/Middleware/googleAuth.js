const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../Controllers/googleAuth');

function isLoggedIn(req, res, next) {
    req.user.user_id ? next() : res.sendStatus(401); 
};

module.exports = {
    isLoggedIn
};