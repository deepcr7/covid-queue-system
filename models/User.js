const mongoose = require("mongoose");

const userSchema = new.mongoose.Schema(
  {
    _id:{
      type: String,
      required: true,
      immutable: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    medicalDetails: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    isVerified: {
      type: Boolean,
      required: true,
      default: false
    },
    phoneNo: {
      type: String,
      match: [/^\+91\d{10}$/, "Only Indian Numbers Allowed"],
      required: true,
      unique: true
    }
  }
)

const User =  mongoose.model('User', userSchema)

module.exports = User;
