const { Users, Role, Products , ContactUs , Reaction, Order, Wishlist, Payments ,Recipient } = require('../Models');

async function getDeliveryOrders(req, res){
    try{

    }catch(error){
        res.status(500).json(error);
    }
};

module.exports = {
    getDeliveryOrders
}