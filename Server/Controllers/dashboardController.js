const { Users, Role, Products , ContactUs , Reaction, Order, Wishlist, Recipient } = require('../Models');

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
        const { product_name, product_category, price, description, type, count, product_rating } = req.body;
        const imageUrl = res.locals.site;
        console.log("this is the url", imageUrl)
        const product = await Products.create({
            product_name : product_name,
            product_category : product_category || null,
            price : price,
            description : description,
            type : type,
            count : count,
            product_rating : product_rating,
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
        const allProducts = await Products.findAll();
        res.status(200).json(allProducts);
    }catch(error){
        console.log(error);
        throw error;
    }
};

async function updateProduct(req, res){
    try{
        const id = req.params.id;
        const {product_name, product_category, price, description, type, count, product_rating} = req.body;
        const updatedProduct = await Products.update(
            {product_name, product_category , price, description, type, count, product_rating}, 
            {
                where: { product_id: id },
                returning: true,
            });
        res.status(201).json(updatedProduct[1]);
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
      console.log(page , limit);
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
        const allOrders = await Order.findAll({
            include: [
              {
                model: Products,
                as: 'product',
                attributes: ['product_name', 'product_rating', 'price', 'img_url'],
              },
              {
                model: Users,
                as: 'User',
                attributes: ['user_id', 'f_name', 'l_name', 'user_email', 'phone_number'],
              },
              {
                model: Recipient,
                as: 'recipient',
                attributes: ['recipient_id', 'recipient_location', 'recipient_name', 'recipient_phone_number', 'createdAt'],
              },
            ],
          });
        res.status(200).json(allOrders);
    }catch(error){
        console.log(error)
        res.status(500).json('error in get all orders controller')
    }
};

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
        const allDrivers = await Users.findAll({
            where : {
                role : 'driver'
            }
        });
        res.status(200).json(allDrivers);
    }catch(error){
        res.status(500).json('error in get divers controller');
    }
};

async function addDriver(req, res){
    try{

    }catch(error){
        res.status(500).json('error in add diver controller');
    }
};

async function dalateDriver(req, res){
    try{

    }catch(error){
        res.status(500).json('error in delete driver controller')
    }
};

async function addAdmin(req, res){
    try{
        const { adminData } = req.body;
        const newAdmin = await Users.create({
            adminData
        });
        res.status(201).json(newAdmin);
    }catch(error){
        res.status(500).json('error in add admin controller');
    }
};

async function updateOrder(req, res){
    try{
        res.status(201).json('done');
    }catch(error){
        res.status(500).json('error in update Order controller');
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
    updateOrder,
};