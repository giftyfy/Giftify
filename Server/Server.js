const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./Models');
require('dotenv').config();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

const passport = require('passport');
const session = require('express-session');

app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const userRoutes = require('./Routes/userRoutes');
const dashboardRoutes = require('./Routes/dashboardRoutes');
const pagesRoutes = require('./Routes/pagesRoutes');
const userProfileRoutes = require('./Routes/userProfileRoutes');
const paymentRoutes = require('./Routes/paymentRoutes');

app.use(userRoutes);
app.use(dashboardRoutes);
app.use(pagesRoutes);
app.use(userProfileRoutes);
app.use(paymentRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// db.sequelize.sync()
//   .then(() => {
//     console.log('Database synced');
//     app.listen(port, () => {
//       console.log(`Server is running on port ${port}`);
//     });
//   }).catch((error) => {
//     console.error('Error syncing database:', error);
// });////////////////////////////////////
