const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/paymentController');
const authorization = require('../Middleware/userAuth');
router.use(express.static("."));

router.get('/create-checkout-session', authorization.authorize, paymentController.getPayment);
router.post('/addRecipientInfo', authorization.authorize, paymentController.addRecipientInfo);
router.get('/homepage', paymentController.afterPayment);

router.get('/notResponding', (req, res) => {
    res.send("sorry there is an error");
});

module.exports = router;