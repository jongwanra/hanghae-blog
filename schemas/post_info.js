const mongoose = require('mongoose');

const { Schema } = mongoose;
const postSchema = new Schema({
  postID: {
    type: String,
    required: true,
    unique: false,
  },
  postTitle: {
    type: String,
    required: true,
    unique: false,
  },
  postContent: {
    type: String,
    required: true,
  },
  postWriter: {
    type: String,
    required: true,
    unique: false,
  },
  postDate: {
    type: String,
    required: true,
  },
  postPassword: {
    type: String,
    required: true,
  },
  postLikeCnt: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Post', postSchema);
