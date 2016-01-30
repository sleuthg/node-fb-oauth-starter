var config = require('./config');
var mongoose = require('mongoose');

module.exports = function() {
  var db = mongoose.connect(config.db);

  // Create a super basic user schema
  var userSchema = new mongoose.Schema({
    displayName: String,
    picture: String,
    facebook: String
  });
  mongoose.model('User', userSchema);

  return db;
};
