const express = require('express');
const router = express.Router();
const dashboardcontroller = require('../Controllers/dashboardController');
const multer = require('../Middleware/multer');

//add admin
router.post('/addAdmin', dashboardcontroller.addAdmin);
router.get('/allusers', dashboardcontroller.getUsers);
router.put('/updateuser/:user_id', dashboardcontroller.updateUsers);
router.put('/deleteuser/:user_id', dashboardcontroller.deleteUser);
router.post('/addDriver', dashboardcontroller.addDriver);
router.get('/getAllDrivers', dashboardcontroller.getDrivers); 
router.put('/deleteDriver', dashboardcontroller.dalateDriver);
router.get('/getproducts', dashboardcontroller.getallProducts);
router.post('/addproduct', multer.uploadImg, dashboardcontroller.addProduct);
router.put('/updateproduct/:id', dashboardcontroller.updateProduct);
router.put('/deleteproduct/:id', dashboardcontroller.deleteProduct);
router.get('/getPaginationProduct/:page/:limit' , dashboardcontroller.getProduactsWithPagination);
router.get('/getcontact', dashboardcontroller.getContact);
router.get('/getOrders', dashboardcontroller.getAllOrders);
router.put('/deleteOrder/:orderID', dashboardcontroller.deleteOrder);
router.put('/updateOrder/:order_id', dashboardcontroller.updateOrder);
//update order

module.exports = router;