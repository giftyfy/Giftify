const express = require('express');
const router = express.Router();
const deliveryDashboardController = require('../Controllers/deliverydashboardController');
const authorization = require('../Middleware/userAuth');
const image = require('../Middleware/multer');

router.get('/getDeliveryRequests', deliveryDashboardController.getDeliveryOrders);
router.put('/updateDeliveryRequests/:recipientID', image.uploadImg, deliveryDashboardController.updateDeliveryRequests);
router.get('/getDeliveryData', deliveryDashboardController.getDeliveryData);
router.post('/delivaryLogin', deliveryDashboardController.delivaryLogin);
router.get('/getDelivaryHistory', deliveryDashboardController.getDeliveryHistory);

module.exports = router;