const express = require('express');
const router = express.Router();
const dashboardcontroller = require('../Controllers/dashboardController');
const multer = require('../Middleware/multer');
const authorization = require('../Middleware/userAuth');

router.post('/adminLogin', dashboardcontroller.adminLogin);
router.get('/getAdmins', authorization.authorize, dashboardcontroller.getAdmins);
router.post('/addAdmin', authorization.authorize, dashboardcontroller.addAdmin);
router.get('/allusers', authorization.authorize, dashboardcontroller.getUsers);
router.put('/updateuser/:user_id', authorization.authorize, dashboardcontroller.updateUsers);
router.put('/deleteuser/:user_id', authorization.authorize, dashboardcontroller.deleteUser);
router.post('/addDriver', authorization.authorize, dashboardcontroller.addDriver);
router.get('/getAllDrivers', authorization.authorize, dashboardcontroller.getDrivers);
router.put('/deleteDriver/:driver_id', authorization.authorize, dashboardcontroller.dalateDriver);
router.get('/getproducts', authorization.authorize, dashboardcontroller.getallProducts);
router.post('/addproduct', authorization.authorize, multer.uploadImg, dashboardcontroller.addProduct);
router.put('/updateproduct/:id', authorization.authorize, multer.uploadImg, dashboardcontroller.updateProduct);
router.put('/deleteproduct/:id', authorization.authorize, dashboardcontroller.deleteProduct);
router.get('/getPaginationProduct/:page/:limit' , dashboardcontroller.getProduactsWithPagination);
router.get('/getcontact', authorization.authorize, dashboardcontroller.getContact);
router.get('/getOrders', authorization.authorize, dashboardcontroller.getAllOrders);
router.put('/deleteOrder/:orderID', authorization.authorize, dashboardcontroller.deleteOrder);
router.get('/getHistoryForAll', authorization.authorize, dashboardcontroller.getHistoryForAll);
// router.put('/updateOrder/:order_id', dashboardcontroller.updateOrder);

module.exports = router;