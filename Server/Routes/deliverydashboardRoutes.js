const express = require('express');
const router = express.Router();
const deliveryDashboardController = require('../Controllers/deliverydashboardController');

router.get('getDeliveryRequests', deliveryDashboardController);
router.put('updateDeliveryRequests',  deliveryDashboardController);
router.get('getDeliveryData', deliveryDashboardController);
router.post(); //login
router.post(); //rigester
router.put(); //updateUserData

module.exports = router;