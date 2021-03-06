const jwt = require('jsonwebtoken');
const userModel = require('../user/userModel');
const PassportLocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
  };
  // find a user by password
  userModel.getPassword(email)
    .then((results) => {
      if (results.length === 0) {
        return done('Error, no user found');
      }
      // check if a hashed user's password is equal to a value saved in the database
      bcrypt.compare(userData.password, results[0].password, (passwordErr, isMatch) => {
        if (passwordErr) {
          return done(passwordErr);
        }
        if (!isMatch) {
          const error = new Error('Incorrect email or password');
          error.name = 'IncorrectCredentialsError';
          return done(error);
        }
        const payload = {
          sub: results[0].id,
        };
        // create a token string
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 30 });
        const data = results[0].id;

        return done(null, token, data);
      });
    });
});
