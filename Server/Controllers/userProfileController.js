const { Users, Role, Products , ContactUs , Reaction, Order, Wishlist, Recipient} = require('../Models');
const { sequelize, DataTypes } = require('sequelize');

async function getUserData(req, res){
    try{
        const userID = req.user.id;
        const userData = await Users.findByPk(userID);
        res.status(200).json(userData);
    }catch(error){
        res.status(500).json('error in get user data');
    }
};

async function updateUserData(req, res){
    try{
        const userID = req.user.id;
        const {f_name, l_name, user_email, user_password} = req.body;
        const user_image = res.locals.site || null;
        const theUser = await Users.update(
            {f_name, l_name, user_email, user_password, user_image}, 
            {
                where: { user_id: userID },
                returning: true,
            });
            res.status(201).json(theUser);
    }catch(error){
        console.log(error)
        res.status(500).json('error in updating user data');
    }
};

async function getWishlist(req, res){
    try{
        const userID = req.user.id;
        const wishlist = await Wishlist.findAll({
            where: {
                user_wishlist_id: userID,
            },
            include: [
                {
                    model: Products,
                    attributes: ['product_id', 'product_name', 'description', 'price', 'product_rating', 'img_url'],
                },
            ],
        });
        res.status(200).json(wishlist);
    }catch(error){
        console.log(error)
        res.status(500).json('error in get wishlist');
    }
};

async function gitOrderHistory(req, res) {
    try {
        const userID = req.user.id;
        const ordersHistory = await Order.findAll({
            where: {
                user_order_id: userID,
                is_payed: true,
            },
            include: [
                {
                    model: Products,
                    as: "product",
                    attributes: ['product_id', 'product_name', 'price', 'product_rating', 'img_url', 'description'],
                },
                {
                    model: Recipient,
                    as: "recipient",
                    attributes: ['recipient_name', 'recipient_location', 'recipient_phone_number'],
                }
            ],
        });

        // Sort orders based on createdAt attribute
        ordersHistory.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        // Group orders by day
        const groupedOrders = ordersHistory.reduce((acc, order) => {
            const orderDate = new Date(order.createdAt).toLocaleDateString();
            const index = acc.findIndex(group => group[0] && new Date(group[0].createdAt).toLocaleDateString() === orderDate);

            if (index !== -1) {
                acc[index].push(order);
            } else {
                acc.push([order]);
            }
            return acc;
        }, []);
        res.status(200).json(groupedOrders);
    } catch (error) {
        console.log(error);
        res.status(500).json('error in git order history');
    }
};

async function deleteOrder(req, res){
    try{
        const { orderID } = req.body;
        const deleteOrder = await Order.findByPk(orderID);
        // if(){

        // }
        await deleteOrder.update({is_deleted : true, is_delivered : true});
        res.status(201).json(deleteOrder);
    }catch(error){
        console.log(error);
        res.status(500).json('error in delete order controller');
    }
};

async function updateUserImage(req, res){
    try{
        const userID = req.user.id;
        const user_img = res.locals.site;
        const updateUser = await Users.findByPk(userID);
        await updateUser.update({user_img: user_img});
        res.status(201).json(updateUser);
    }catch(error){
        console.log(error);
        res.status(500).json('error in update User Image controller');
    }
};

module.exports = {
    getUserData,
    getWishlist,
    updateUserData,
    gitOrderHistory,
    deleteOrder,
    updateUserImage,
};