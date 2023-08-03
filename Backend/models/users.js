// models/User.js

const mongoose = require('mongoose');

// const ObjectId = Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },


});

const User = mongoose.model('User', userSchema);

module.exports = User;
