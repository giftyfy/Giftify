const express = require('express');
const router = express.Router();
const deliveryDashboardController = require('../Controllers/deliverydashboardController');
const authorization = require('../Middleware/userAuth');
const image = require('../Middleware/multer');

router.post('/deliveryLogin', deliveryDashboardController.delivaryLogin);
router.get('/getDeliveryRequests', authorization.authorize, deliveryDashboardController.getDeliveryOrders);
router.get('/updateDeliveryRequests/:recipientID', authorization.authorize, image.uploadImg, deliveryDashboardController.updateDeliveryRequests);
router.get('/getDeliveryData', authorization.authorize, deliveryDashboardController.getDeliveryData);
router.post('/delivaryLogin', authorization.authorize, deliveryDashboardController.delivaryLogin);
router.get('/getDelivaryHistory', authorization.authorize, deliveryDashboardController.getDeliveryHistory);
router.get('/sendMessages/:recipientID', authorization.authorize, deliveryDashboardController.sendMessages);

module.exports = router;