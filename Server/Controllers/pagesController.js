// const { func } = require('joi');
const { Users, Role, Products , ContactUs , Reaction, Order, Wishlist } = require('../Models');
const { Sequelize } = require('sequelize');
// const Category = require('../Models/categoryModel');

async function getproductsCategory(req, res){
    try{
        const categoryID = req.params.category;
        const filterProducts = await Products.findAll({
            where: {
              product_category: categoryID,
              is_deleted : false,
            },
          });
          res.status(200).json(filterProducts);
    }catch(error){
        res.status(500).json("error in get products Category");
    }
};

async function getproductsType(req, res){
    try{
        const typeID = req.params.type;
        const productsType = await Products.findAll({
            where: {
                type: typeID,
                is_deleted : false,
            },
          });
          res.status(200).json(productsType);
    }catch(error){
        res.status(500).json("error in get products Type");
    }
};

async function getProductDetails(req, res){
    try{
        // const user_id =  req.user.id;
        const productID = req.params.id;
        const product = await Products.findByPk(productID);
        const reactions = await Reaction.findAll({
            where : {
                product_reaction_id : productID,
                is_deleted: false,
            }
        });
        res.status(200).json({product, reactions});
    }catch(error){
        console.log(error);
        res.status(500).json("error in get Details");
    }
};

async function addReaction(req, res){
    try{
        const user_reaction_id = req.user.id;
        const { rating, comment } = req.body;
        const product_reaction_id = req.params.id;
        const userInOrders = await Order.findOne({
            where : {
                user_order_id : user_reaction_id,

            }
        });
        if(userInOrders){
            const theReaction = await Reaction.create({
                product_reaction_id : product_reaction_id,
                rating : rating || 0,
                comment : comment || null,
                user_reaction_id : user_reaction_id,
            });
            const ractions = await Reaction.findAll({
                where : {
                    product_reaction_id : product_reaction_id,
                }
            });
            let product_rating = 0;
            console.log(ractions[0].dataValues);
            for(let i = 0; i < ractions.length; i++){
                product_rating += ractions[i].dataValues.rating;
            }
            product_rating = product_rating / ractions.length;
            const updatedProduct = await Products.update(
                {product_rating}, 
                {
                    where: { product_id: product_reaction_id },
                    returning: true,
                });
            res.status(201).json({theReaction, updatedProduct});
        }else {
            res.status(400).json("You need to purchase the product to leave a comment.");
        }
    }catch(error){
        console.log(error);
        res.status(500).json("error in add Reaction");
    }
};

async function addToOreders(req, res){
    try{
        const userID = req.user.id;
        console.log(userID);
        const productID = req.body.productData.product_id;
        const  price = req.body.productData.price;
        const findOrder = await Order.findOne({
            where : {
                product_order_id : productID,
                is_deleted : false,
                is_payed : false,
            }
        });
        if(findOrder){
            await findOrder.update({order_count : findOrder.order_count + 1});
            res.status(201).json(findOrder);
        }else{
            const order = await Order.create({
                user_order_id : userID,
                product_order_id : productID,
                order_price : price,
                order_count : 1,
                is_payed : false,
                order_for : null,
            });
            res.status(201).json(order);
        }
    }catch(error){
        console.log(error);
        res.status(500).json("error in add To Oreders");
    }
};

async function addToWishlist(req, res){
    try{
        const userID = req.user.id;
        const productID = req.params.id;
        const wishlist = await Wishlist.create({
            user_wishlist_id : userID,
            product_wishlist_id : productID,
        });
        res.status(201).json(wishlist);
    }catch(error){
        console.log(error);
        res.status(500).json('error in add to wish list');
    }
};

async function sendContactus(req, res){
    try{
        const {f_contactname, l_contactname, user_contact_id, contact_email, phone_number, contact_message} = req.body;
        const contact = await ContactUs.create({
            f_contactname : f_contactname,
            l_contactname : l_contactname,
            contact_email : contact_email,
            phone_number : phone_number,
            contact_message : contact_message,
        });
    }catch(error){
        res.status(500).json('error in send contactus message')
    }
};

async function removeFromOrders(req, res){
    try{
        const userID = req.user.id;
        const OrderID = req.body.params.order_id;
        const deletedOrder = await Order.update({is_deleted : true},{
            where : {
                user_order_id : userID,
                order_id : OrderID,
            }
        });
        res.status(201).json(deletedOrder);
    }catch(error){
        res.status(500).json("error in remove from orders");
    }
};

async function updateReaction(req, res){
    try{
        const comment = req.body;
        // const productID = req.body;
        const userID = req.user.id;
        const comments = await Reaction.update({comment},{
            where : {
                user_reaction_id : userID, 
                product_reaction_id : 48 
            }
        });
        res.status(201).json(comments);
    }catch(error){
        res.status(500).json('error in update reaction');
    }
};

async function deleteReaction(req, res){
    try{
        const userID = req.user.id;
        const reactionID = req.body;
        const reaction = await Reaction.update({is_deleted : true}, 
            {
                where : {
                    reaction_id : reactionID,
                }
            });
    }catch(error){
        res.status(500).json('error in delete reaction');
    }
};

async function getOrders(req, res){
    try{
        const userID = req.user.id;
        const orders = await Order.findAll({
            where : {
                user_order_id : userID,
                is_deleted : false,
            }
        });
        res.status(200).json(orders);
    }catch(error){
        res.status(500).json('error in get orders');
    }
};

async function increment(req ,res){
    try{
        const userID = req.user.id;
        const orderID = req.params.itemId;
        const orderIncrement = await Order.findOne({
            where : {
                order_id : orderID,
                user_order_id : userID
            },
            returning: true
        });
        await orderIncrement.update({
            order_count: orderIncrement.order_count + 1,
          });
        res.status(201).json(orderIncrement);
    }catch(error){
        res.status(500).json('error in increment controller');
    }
};

async function decrement(req, res){
    try{
        const userID = req.user.id;
        const orderID = req.params.itemId;
        const orderIncrement = await Order.findOne({
            where : {
                order_id : orderID,
                user_order_id : userID
            },
            returning: true
        });
        await orderIncrement.update({
            order_count: orderIncrement.order_count - 1,
          });
        res.status(201).json(orderIncrement);
    }catch(error){
        res.status(500).json('error in Decrement controller')
    }
};

async function getCart(req, res){
    try{
        const userID = req.user.id;
        const cartData = await Order.findAll({
            where : {
                is_deleted : false,
                is_payed : false,
                user_order_id : userID,
            },
            include: [
                {
                  model: Products,
                  as: 'product',
                  attributes: ['product_id', 'product_name', 'product_rating', 'price', 'img_url'],
                }
              ],
        });
        res.status(200).json(cartData);
    }catch(error){
        console.log(error);
        res.status(500).json('error in get cart controller');
    }
};

async function getTopRated(req, res) {
    try {
        const topRatedProducts = await Products.findAll({
            order: [['product_rating', 'DESC']], // Order by product_rating in descending order
            limit: 10,
        });
        res.status(200).json(topRatedProducts);
    } catch (error) {
        console.error('Error in get top rated controller:', error);
        res.status(500).json('Error in get top rated controller');
    }
};

async function getTopSales(req, res){
    try{
        const topSalesProducts = await Order.findAll({
            attributes: [
                'product_order_id',
                'product.product_id', // Include product_id in the SELECT clause
                [Sequelize.fn('COUNT', Sequelize.col('product_order_id')), 'order_count'],
                [Sequelize.literal('(SELECT COUNT(*) FROM "Orders" AS "SubOrder" WHERE "SubOrder"."product_order_id" = "Order"."product_order_id")'), 'how_many_times_repeated']
            ],
            where: {
                is_payed: true,
            },
            group: ['product_order_id', 'product.product_id'],
            order: [
                [Sequelize.literal('order_count'), 'DESC']
            ],
            limit: 4,
            include: [
                {
                    model: Products,
                    as: 'product',
                    attributes: ['product_id', 'product_name', 'description', 'price', 'product_rating', 'img_url'],
                    on: {
                        'product_id': {
                            [Sequelize.Op.eq]: Sequelize.literal('"Order"."product_order_id"::integer')
                        }
                    },
                },
            ],
        });
        res.status(500).json(topSalesProducts);
    }catch(error){
        console.error('Error in get top Sales controller:', error);
        res.status(500).json('Error in get top Sales controller');
    }
};

async function getNewCollection(req, res){
    try{
        const newProducts = await Products.findAll({
            order: [['createdAt', 'DESC']], // Order by createdAt in descending order
            limit: 5,
        });
        res.status(200).json(newProducts);
    }catch(error){
        console.error('Error in get NewCollection controller:', error);
        res.status(500).json('Error in get NewCollection controller');
    }
};

module.exports = {
    getproductsCategory,
    getproductsType,
    getProductDetails,
    addReaction,
    addToOreders,
    addToWishlist,
    sendContactus,
    removeFromOrders,
    updateReaction,
    deleteReaction,
    getOrders,
    increment,
    decrement,
    getCart,
    getTopRated,
    getTopSales,
    getNewCollection,
};








        // if (ractions.length > 1){

        // }
        // else {
        //     const userInOrders = await Order.findOne({
        //         where : {
        //             user_order_id : user_reaction_id,
        //         }
        //     });
        //     if (userInOrders){
        //         const updatedProduct = await Products.update(
        //             {product_rating}, 
        //             {
        //                 where: { product_id: product_reaction_id },
        //                 returning: true,
        //             });
        //         res.status(201).json({theReaction, updatedProduct});
        //     }else {
        //         res.status().json("You need to purchase the product to leave a comment.");
        //     }
        // }