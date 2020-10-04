const mongoose = require("mongoose")

const queueSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    immutable: true,
  },
  DoctorId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  currentPosition:{
    type: Number,
    default:0,
    min:0
  },
  nextPosition:{
    type: Number,
    default:1,
    min: 1
  }
})

const Queue =  mongoose.model('Queue', queueSchema)

module.exports = Queue;