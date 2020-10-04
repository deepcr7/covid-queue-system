const mongoose = require("mongoose")

const tokenSchema = mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  queue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Queue',
      required: true
  },
  time: {
      type: Date,
      default: Date.now
  },
  number: {
      type: Number,
      required: true,
      min: 1
  }
});

const Token =  mongoose.model('Queue', tokenSchema)

module.exports = Token;