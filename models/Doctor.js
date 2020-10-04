const mongoose = require("mongoose")

const doctorSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    immutable: true,
  },
  departmentName: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  queueId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Queue",
    required: true,
  }
})

const Doctor =  mongoose.model('Doctor', doctorSchema)

module.exports = Doctor;