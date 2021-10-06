const mongoose = require('mongoose');

const { Schema } = mongoose;
const likeSchema = new Schema({
  postID: {
    type: String,
    required: true,
    unique: false,
  },
  userID: {
    type: String,
    required: true,
    unique: false,
  },
});

module.exports = mongoose.model('Like', likeSchema);
