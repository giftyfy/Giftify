const { Users, Role, Products , ContactUs , Delivery, Order, Wishlist, Payments ,Recipient } = require('../Models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const Cookies = require('js-cookie');
const { where } = require('sequelize');
const twilio = require('twilio');
require('dotenv').config();
const https = require('follow-redirects').https;
const messagebird = require('messagebird');

const schema = Joi.object({
    f_name : Joi.string().alphanum().min(3).max(10).required(),
    l_name : Joi.string().alphanum().min(3).max(10).required(),
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

async function getDeliveryOrders(req, res) {
    try {
        // const user_id = req.user.id;
        // const driver = await Users.findByPk(user_id);
        // const dilevaryalaocation = driver.user_location;
        const allPayedOrders = await Order.findAll({
            where: {
                is_payed: true,
                is_delivered : false,
                recipient_delivered_seg : null,
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
        const filteredOrders = allPayedOrders.filter(order => order.recipient.recipient_location === "amman");
        if (filteredOrders.length === 0) {
            res.status(404).json({ message: 'No paid orders found with recipient in "amman".' });
            return;
        }

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

        res.status(200).json(groupOrdersByRecipient(filteredOrders));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

async function delivaryLogin(req, res){
    try{
        const { email, password } = req.body;
        const valid = validation("fname", "lname", email, password, "12345678910");
        const user_email = email;
        if (valid){
            const user = await Users.findOne({
                where: {
                    user_email,
                    role: 3,
                },
            });
            if (user && user.user_email === email) {
                    bcrypt.compare(password , user.user_password, (error, result) => {
                    if (error) {
                        res.status(400).json(error);
                    } else if (result) {
                        console.log(user.dataValues.user_id);
                        const accessToken = jwt.sign({id : user.dataValues.user_id, email : user.user_email}, process.env.SECRET_KEY, {expiresIn: '4h'});
                        res.cookie('accessToken', accessToken, { httpOnly: true });
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
        res.status(500).json('error in delivary login controller');
    }
};

async function updateDeliveryRequests(req, res) {
    try {
        const delivaryID = 45;
        const recipientID = req.params.recipientID;
        console.log(recipientID)
        const recipient_seg = res.locals.site;
        // Find all orders that are not delivered and match the recipientID
        const ordersFor = await Order.findAll({
            where: {
                is_delivered: false,
                recipient_delivered_seg: null,
                order_for: recipientID,
            },
        });
        // Check if there is an existing delivery for the recipientID
        const existingDelivery = await Delivery.findOne({
            where: {
                delivery_for_id: recipientID,
            },
        });
        if (existingDelivery) {
            // Collect all order IDs and user IDs in arrays
            const ordersID = ordersFor.map(order => order.order_id);
            const usersID = ordersFor.map(order => order.user_order_id);
            // Create a new delivery
            const newDelivery = await Delivery.create({
                delivery_from: usersID,
                order_delivery: ordersID,
                delivery_for_id: recipientID,
                recipient_seg: recipient_seg,
                theDriver: delivaryID,
            });
            // Update is_delivered to true for the matched orders
            await Order.update(
                { is_delivered: true },
                {
                    where: {
                        order_id: ordersID,
                    },
                }
            );
            //send message that the order has been reseved ===>
            res.redirect(`http://localhost:8080/sendMessages/${recipientID}`);
        } else {
            res.status(401).json('You need to take the signature first or has been deliviered');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Error in update delivery requests controller');
    }
};

async function getDeliveryData(req, res){
    try{
        const delivaryID = req.user.id;
        const delivaryData = await Users.findByPk(delivaryID);
        res.status(200).json(delivaryData);
    }catch(error){
        res.status(500).json('error ro get delivary data controller');
    }
};

async function getDeliveryHistory(req, res){
    try {
        const delivaryID = 45;
        const delivaryHistory = await Delivery.findAll({
            where : {
                theDriver : delivaryID
            }
        });
        res.status(200).json(delivaryHistory);
    } catch(error){
        console.log(error)
        res.status(500).json('error in get Delivery History controller');
    }
};

async function sendMessages(req, res) {
  try {
    const recipient_id = req.params.recipientID;
    
    const options = {
      method: 'POST',
      hostname: 'e136gn.api.infobip.com',
      path: '/sms/2/text/advanced',
      headers: {
        'Authorization': 'App d54ada5623179fa9cb366c2bfdd3b037-7c7e2750-de69-4d0c-a45d-02c3e120b914',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      maxRedirects: 20,
    };

    const postData = {
      "messages": [
        {
          "destinations": [{"to": '+9620777716328'}],
          "from": "ServiceSMS",
          "text": `Your order has been delivered to ${recipient_id}`
        }
      ]
    };

    const postDataString = JSON.stringify(postData);

    const request = https.request(options, (response) => {
      let chunks = [];

      response.on('data', (chunk) => {
        chunks.push(chunk);
      });

      response.on('end', () => {
        const body = Buffer.concat(chunks);
        console.log(body.toString());
        res.send(body.toString());
      });
    });

    request.on('error', (error) => {
      console.error(error);
      res.status(500).send('Error sending SMS');
    });

    // Send the JSON-formatted data in the request body
    request.write(postDataString);
    request.end();
  } catch (error) {
    console.log(error);
    res.status(500).json('Error in send messages controller');
  }
};

module.exports = {
    getDeliveryOrders,
    delivaryLogin,
    updateDeliveryRequests,
    getDeliveryData,
    getDeliveryHistory,
    sendMessages,
    delivaryLogin
};



// module.exports = sendMessages;







// async function sendMessage(number){
//     try{
        // const accountSid = process.env.TWILIO_ACCOUNT_SID;
        // const authToken = process.env.TWILIO_AUTH_TOKEN;
        // const client = twilio(accountSid, authToken);
        // const twilioPhoneNumber = '+12059903818';
        // const recipientPhoneNumber = '+962 7 7771 6328';
        // client.messages.create({
        //     body: 'Hello, this is a test message from Twilio!',
        //     from: twilioPhoneNumber,
        //     to: recipientPhoneNumber,
        // })
        // .then(message => {
        //     console.log('Message SID:', message.sid);
        // })
        // .catch(error => {
        //     console.error('Error sending SMS:', error.message);
        // });
//         const accountSid = 'AC6a0f7b8d65526535669638c974d6b8ce';
//         const authToken = 'fd4f64dc4899a2677b537860af3dd5a0';
//         const client = require('twilio')(accountSid, authToken);

//         client.messages
//             .create({
//                     body : 'this is test',
//                     to: '+9620777716328',
//                     from : '+1 205 990 3818',
//             })
//             .then(message => console.log(message.sid))
//             .done();
//     }catch(error){
//         console.log(error);
//     }
// };