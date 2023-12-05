const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { Users } = require('../Models');
const {sequelize, DataTypes} = require("sequelize");
const { Op } = require('sequelize');

const app = express();
app.use(express.json());

// app.use(session(
//     { 
//         secret: process.env.SECRET_KEY,
//         resave: true,
//         saveUninitialized: true 
//     }
// ));

// app.use(passport.initialize());
// app.use(passport.session());
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/google/callback',
    passReqToCallback: true,
  }, async (req, accessToken, refreshToken, profile, done) => {
    try {
        const [user, created] = await Users.findOrCreate({
          where: {
            [Op.or]: [
                { googleUserId: profile.id },
                { user_email: profile.email },
              ],
          },
          defaults: {
            f_name: profile.name.givenName,
            l_name: profile.name.familyName,
            user_email: profile.email,
            phone_number: profile.phone || null,
            user_location: profile._json && profile._json.location || null,
            blocked: false,
            role_id: 1,
            googleUserId: profile.id,
          },
        });
    
        if (!created) {
          await Users.update({
            f_name: profile.name.givenName,
            l_name: profile.name.familyName,
            phone_number: profile.phone || null,
            user_location: profile._json && profile._json.location || null,
          }, {
            where: {
                [Op.or]: [
                    { googleUserId: profile.id },
                    { user_email: profile.email },
                  ],
            },
          });
        }
    
        done(null, user.toJSON());
      } catch (error) {
        done(error);
      }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    done(null, user);
});