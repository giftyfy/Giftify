const { Users, Role, Products , ContactUs , Reaction, Order, Wishlist, Recipient, Driver, Delivery } = require('../Models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const { where } = require('sequelize');

const schema = Joi.object({
    f_name : Joi.string().min(3).max(10).required(),
    l_name : Joi.string().min(3).max(10).required(),
    email : Joi.string().email().required(),
    password : Joi.string().required(),
    phone_number : Joi.string().min(9).max(14).required()
});

function validation(f_name, l_name, email, password, phone_number){
    const valid = schema.validate({f_name, l_name, email, password, phone_number});
        console.log(valid);
        if (valid.error == undefined){
            return true;
        }else {
            return false;
        }
};

async function getUsers(req, res){
    try {
        const usersWithRoles = await Users.findAll({
          include: [
            {
              model: Role,
              attributes: ['role_name'],
            },
          ],
        });
        res.status(200).json(usersWithRoles);
      } catch (error) {
        console.error('Error getting users with roles:', error);
        throw error;
      }
};

async function updateUsers(req, res){
    try{
        const user_id = req.params.user_id;
        // const { f_name, l_name, user_email, phone_number, user_location } = req.body;
        const user = await Users.findByPk(user_id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        }
        await user.update(req.body);
        res.status(201).json({ message: 'User updated successfully', user });
    }catch(error){
        console.error('Error update Users:', error);
        throw error;
    }
};

async function deleteUser(req, res){
    try{
        // console.log(11111111, req.params.user_id)
        const user_id = req.params.user_id;
        const user = await Users.findByPk(user_id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        }
        if(user.blocked == true){
            await user.update({ blocked : false });
        }else {
            await user.update({ blocked : true });
        }
        res.status(200).json({message: 'User soft-deleted successfully', user});
    }catch(error){
        console.error('Error delete User:', error);
        throw error;
    }
};

async function addProduct(req, res){
    try{
        const { Product_title, category, price, Product_description, product_type, count } = req.body;
        const imageUrl = res.locals.site;
        // console.log("this is the url", imageUrl)
        const product = await Products.create({
            product_name : Product_title,
            product_category : category || null,
            price : price,
            description : Product_description,
            type : product_type,
            count : count,
            product_rating : 0,
            img_url : imageUrl,
        });
        res.status(201).json({ product });
    }catch(error){
        console.error('Error add Product:', error);
        throw error;
    }
};

async function getallProducts(req, res){
    try{
        const allProducts = await Products.findAll({
            where:{
                is_deleted: false,
            }
        });
        res.status(200).json(allProducts);
    }catch(error){
        console.log(error);
        throw error;
    }
};

async function updateProduct(req, res){
    try{
        const id = req.params.id;
        const {Product_title, category, price, Product_description, product_type, count} = req.body;
        const updatedProduct = await Products.update(
            {
                product_name: Product_title,
                product_category: category,
                price: price,
                description: Product_description,
                type: product_type,
                count: count,
            }, 
            {
                where: { product_id: id },
                returning: true,
            });
        res.status(201).json(updatedProduct);
    }catch(error){
        console.log(error);
        throw error;
    }
};

async function deleteProduct(req, res){
    try{
        const id = req.params.id;
        const theProduct = await Products.findByPk(id);
        if(theProduct.is_deleted == false){
            await theProduct.update({is_deleted : true});
        }else{
            await theProduct.update({is_deleted : false});
        }
        res.status(201).json(theProduct);
    }catch(error){
        console.log(error);
        throw error;
    }
};

async function getContact(req, res){
    try{
        const contact = await ContactUs.findAll();
        res.status(200).json(contact);
    }catch(error){
        console.log(error);
        throw error;
    }
};

async function getProduactsWithPagination(req, res){
    try {
      const page = req.params.page || 1;
      const limit = req.params.limit || 4;
      if (page < 0 || limit < 0){
        res.json("invalid inputs");
      };
    //   console.log(page , limit);
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const allProducts = await Products.findAll();
      const results = {};
      if (endIndex < allProducts.length) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      };
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      };
      results.results = allProducts.slice(startIndex, endIndex);
      res.json(results);
    }catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
};

async function getAllOrders(req, res){
    try{
        // const user_id = req.user.id;
        // const driver = await Users.findByPk(user_id);
        // const dilevaryalaocation = driver.user_location;
        const allPayedOrders = await Order.findAll({
            where: {
                is_payed: true,
                // is_delivered : false,
                // recipient_delivered_seg : null,
            },
            include: [
                {
                    model: Recipient,
                    as: 'recipient',
                },
                {
                    model: Products,
                    as: 'product',
                },
                {
                    model: Users,
                    as: 'User',
                },
            ],
        });
        // Filter the orders based on recipient_location
        // const filteredOrders = allPayedOrders.filter(order => order.recipient.recipient_location === dilevaryalaocation);
        // if (filteredOrders.length === 0) {
        //     res.status(404).json({ message: `No paid orders found with recipient in ${dilevaryalaocation}.` });
        //     return;
        // }

        function groupOrdersByRecipient(orders) {
            // Create an object to store grouped orders
            const groupedOrders = {};
            // Iterate over the orders and group them based on the order_for value
            orders.forEach(order => {
                const orderForKey = order.order_for || 'unknown'; // Use 'unknown' if order_for is null
                if (!groupedOrders[orderForKey]) {
                    groupedOrders[orderForKey] = {
                        orderFor: orderForKey,
                        isDelivered: true, // Default to true
                        orders: [],
                    };
                }
                groupedOrders[orderForKey].orders.push(order);
                // Update isDelivered based on the current order
                if (!order.is_delivered) {
                    groupedOrders[orderForKey].isDelivered = false;
                }
            });
            // Convert the groupedOrders object to an array of objects
            const result = Object.values(groupedOrders);
            return result;
        }
        res.status(200).json(groupOrdersByRecipient(allPayedOrders));
    }catch(error){
        console.log(error)
        res.status(500).json('error in get all orders controller')
    }
};

        // const allOrders = await Order.findAll({
        //     include: [
        //       {
        //         model: Products,
        //         as: 'product',
        //         attributes: ['product_name', 'product_rating', 'price'],
        //       },
        //       {
        //         model: Users,
        //         as: 'User',
        //         attributes: ['user_id', 'f_name', 'l_name', 'user_email', 'phone_number'],
        //       },
        //       {
        //         model: Recipient,
        //         as: 'recipient',
        //         attributes: ['recipient_id', 'recipient_location', 'recipient_name', 'recipient_phone_number', 'createdAt'],
        //       },
        //     ],
        //   });
        // res.status(200).json(allOrders);


async function deleteOrder(req, res){
    try{
        const orderID = req.params.orderID;
        const is_payed = false;
        const is_deleted = true;
        const deltedOrder = await Order.update({is_payed, is_deleted},
            {
                where : {
                    order_id : orderID
                }
            });
        res.status(201).json(deltedOrder);
    }catch(error){
        console.log(error)
        res.status(500).json('error in delete order controller');
    }
};

async function getDrivers(req, res){
    try{
        const divers = await Driver.findAll({
            include: [
                {
                  model: Users,
                  as: 'driver',
                  attributes: ['user_id', 'f_name', 'l_name', 'user_email', 'user_location'],
                  where : {
                    role_id: 3,
                  }
                }
              ],
        });
        res.status(200).json(divers);
    }catch(error){
        console.log(error)
        res.status(500).json('error in get divers controller');
    }
};

async function addDriver(req, res){
    try{
        const { email, phone_number, plate_number, driver_license, card_id, driver_location} = req.body;
        const valid = validation("fname", "lname", email, "password123", "1234567891");
        // console.log(email, phone_number, plate_number, driver_license, card_id);
        if (valid){
            const theUser = await Users.findOne({
                where : {
                    user_email: email,
                    role_id: 1,
                }
            });
            const newDriver = await Driver.create({
                driverLicense: driver_license,
                plateNumber: plate_number,
                card_id: driver_license,
                driver_user_id: theUser.user_id,
            });
            await theUser.update({role_id: 3, driver_location});
            res.status(201).json(newDriver);
        }else {
            res.status(400).json("Invalid input");
        }
    }catch(error){
        console.log(error)
        res.status(500).json('error in add diver controller');
    }
};

async function dalateDriver(req, res){
    try{
        // driver_user_id
        const driver_id = req.params.driver_id;
        const driver = await Driver.findOne({
            where : {
                driver_id : driver_id
            }
        });
        await Users.update(
            { role_id: 1 },
            {
                where: {
                    user_id: driver.driver_user_id
                }
            }
        );
        driver.destroy();
        res.status(201).json(Users);
    }catch(error){
        res.status(500).json('error in delete driver controller')
    }
};

async function addAdmin(req, res){
    try{
        // console.log(req.body);
        const { user_username, user_email, user_phone_number, user_password } = req.body;
        const [f_name, l_name] = user_username.split(' ');
        let password = await bcrypt.hash(user_password, 10);
        const newAdmin = await Users.create({
            f_name,
            l_name,
            user_email,
            phone_number: user_phone_number,
            user_password: password,
            role_id: 2,
        });
        res.status(201).json(newAdmin);
    }catch(error){
        console.log(error);
        res.status(500).json('error in add admin controller');
    }
};

async function getAdmins(req, res){
    try{
        const admins = await Users.findAll({
            where : {
                role_id : 2,
                blocked : false,
            }
        });
        res.status(200).json(admins);
    }catch(error){
        res.status(500).json('error in get admins controller')
    }
};

async function adminLogin(req, res){
    try{
        const { user_email, user_password } = req.body;
        console.log(req.body)
        const email = user_email;
        const password = user_password;
      const valid = validation("fname", "lname", email, password, "12345678910");
      if (valid){
        const user = await Users.findOne({
            where: {
              user_email,
              role_id: 2,
            },
          });
          if (user && user.user_email === email) {
                bcrypt.compare(user_password , user.user_password, (error, result) => {
                if (error) {
                    res.status(400).json(error);
                } else if (result) {
                    // console.log(user.dataValues.user_id);
                    const accessToken = jwt.sign({id : user.dataValues.user_id, email : user.user_email}, process.env.SECRET_KEY, {expiresIn: '4h'});
                    res.cookie('accessToken', accessToken);
                    res.status(200).json(accessToken);
                } else {
                    res.status(400).json('incorrect password');
                }
                });
          }else {
            res.status(401).json({ error: 'Email not found' });
          }
      } else {
            res.status(400).json("Invalid inputs");
      }
    }catch(error){
        console.log(error);
        res.status(500).json("error in login controller");
    }
};

async function getHistoryForAll(req, res){
    try{
        const all = await Delivery.findAll({
            include: [
                {
                    model: Recipient,
                    as: 'for',
                    attributes: ['recipient_name', 'recipient_location', 'recipient_date']
                },
                {
                    model: Users,
                    as: "driver",
                    attributes: ['f_name', 'l_name', 'phone_number']
                },
            ]
        });
        res.status(200).json(all);
    }catch(error){
        console.log(error);
        res.status(500).json("error in getHistoryForAll controller");
    }
}

module.exports = {
    getUsers,
    updateUsers,
    deleteUser,
    addProduct,
    getallProducts,
    updateProduct,
    deleteProduct,
    getContact,
    getProduactsWithPagination,
    getAllOrders,
    deleteOrder,
    getDrivers,
    addDriver,
    dalateDriver,
    addAdmin,
    // updateOrder,
    getAdmins,
    adminLogin,
    getHistoryForAll
};




// async function updateOrder(req, res){
//     try{
//         const {} = req.body;

//         res.status(201).json('done');
//     }catch(error){
//         res.status(500).json('error in update Order controller');
//     }
// };