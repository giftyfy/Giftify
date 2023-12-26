const express = require('express');
const router = express.Router();
const authorization = require('../Middleware/userAuth');
const userProfileController = require('../Controllers/userProfileController');
const image = require('../Middleware/multer');

router.get('/getUserData', authorization.authorize, userProfileController.getUserData);
router.get('/getwishlist', authorization.authorize, userProfileController.getWishlist);
router.get('/getOrderHistory', authorization.authorize, userProfileController.gitOrderHistory);
router.put('/deleteOrder', authorization.authorize, userProfileController.deleteOrder);
router.put('/UpdateUserData', authorization.authorize, userProfileController.updateUserData);
router.put('/updateImage', authorization.authorize, image.uploadImg, userProfileController.updateUserImage);

module.exports = router;