const passport = require('passport');
const local = require('./strategies/local');

module.exports = () => {
  passport.user(local);

  passport.serializeUser((user, callback) => {
    callback(null, user);
  });

  passport.deserializeUser((obj, callback) => {
    callback(null, obj);
  });
};