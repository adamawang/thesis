const jwt = require('jsonwebtoken');
const PassportFacebookStrategy = require('passport-facebook').Strategy;
const userModel = require('../user/userModel');

module.exports = new PassportFacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://concertwallet.digitalotion.com/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'picture', 'email'],
}, (accessToken, refreshToken, profile, done) => {
  userModel.users.getPassword(profile.emails[0].value)
    .then((results) => {
      if (results.length > 0 && results.password) {
        return done('Error, email has already been used');
      }
      if (results.length === 0) {
        const params = [profile.emails[0].value, null, profile.displayName, profile.photos[0].value]
        userModel.users.addOne(params)
          .then((response) => {
            if (!response) {
              console.log('Error adding facebook user to database in Passport Strategy');
              return done('Error adding facebook user to database in Passport Strategy');
            }
            userModel.users.findById(response[0])
              .then((userInfo) => {
                const info = {
                  sub: userInfo[0].id,
                }
                const userToken = jwt.sign(info, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
                const userId = userInfo[0].id;
                return done(null, userToken, userId);
              });
          });
      } else {
        const payload = {
          sub: results[0].id,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
        const data = results[0].id;
        return done(null, token, data);
      }
    });
});
