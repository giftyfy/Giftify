const express = require('express');
const router = express.Router();
const authorization = require('../Middleware/userAuth');
const userProfileController = require('../Controllers/userProfileController');

router.get('/getUserData', authorization.authorize, userProfileController.getUserData);
router.get('/getwishlist', authorization.authorize, userProfileController.getWishlist);
router.put('/UpdateUserData', authorization.authorize, userProfileController.updateUserData);
router.get('/getOrderHistory', authorization.authorize, userProfileController.gitOrderHistory);

module.exports = router;