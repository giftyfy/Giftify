const express = require('express');
const router = express.Router();
const middleware = require('../Middleware/userAuth');
const userProfileController = require('../Controllers/userProfileController');

router.get('/getUserData', userProfileController.getUserData);
router.get('/getwishlist', userProfileController.getWishlist);
router.put('/UpdateUserData', userProfileController.updateUserData);
router.get('/getOrderHistory', userProfileController.gitOrderHistory);

module.exports = router;