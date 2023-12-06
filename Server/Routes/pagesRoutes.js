const express = require('express');
const router = express.Router();
const pagesController = require('../Controllers/pagesController');
const authorization = require('../Middleware/userAuth');

router.get('/getproductsCategory/:category', pagesController.getproductsCategory);
router.get('/getproductsType/:type', pagesController.getproductsType);
router.get('/getdetails/:id', pagesController.getProductDetails);
router.post('/addReaction/:id', authorization.authorize, pagesController.addReaction);
router.put('updateReaction', authorization.authorize, pagesController.updateReaction);
router.put('deleteReaction',  authorization.authorize, pagesController.deleteReaction);
router.get('/getOrders', authorization.authorize, pagesController.getOrders);
router.get('/getCart', authorization.authorize, pagesController.getCart);
router.post('/addToOrdaers', authorization.authorize, pagesController.addToOreders);
router.put('/removeFromOrders', authorization.authorize, pagesController.removeFromOrders);
router.put('/orderIncrement/:itemId', authorization.authorize, pagesController.increment);
router.put('/orderDecrement/:itemId', authorization.authorize, pagesController.decrement)
router.post('/addToWishlist/:id', authorization.authorize, pagesController.addToWishlist);
router.post('/sendContactus', pagesController.sendContactus);
router.get('/getTopRated', pagesController.getTopRated);
router.get('/getTopSales', pagesController.getTopSales);
router.get('/getNewCollection', pagesController.getNewCollection);

module.exports = router;