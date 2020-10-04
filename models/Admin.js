const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    immutable: true,
  },
  name:{
    type: String,
    required: true,
    trim: true
  }
})

const Admin =  mongoose.model('Admin', adminSchema)

module.exports = Admin;