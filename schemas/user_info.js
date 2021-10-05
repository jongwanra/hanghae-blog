const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },

  userNickname: {
    type: String,
    required: true,
    unique: true,
  },

  userPassword: {
    type: String,
    required: true,
    unique: false,
  },
});

module.exports = mongoose.model('User', userSchema);
