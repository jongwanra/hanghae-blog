const mongoose = require('mongoose');

const { Schema } = mongoose;
const commentSchema = new Schema({
  postID: {
    type: String,
    required: true,
    unique: false,
  },
  commentID: {
    type: String,
    required: true,
    unique: true,
  },

  commentContent: {
    type: String,
    required: true,
    unique: false,
  },
  commentWriter: {
    type: String,
    required: true,
    unique: true,
  },

  commentDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Comment', commentSchema);
