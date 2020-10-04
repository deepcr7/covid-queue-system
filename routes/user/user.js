const Router = require("express").Router()
const User = require("../../models/User")

Router.get("/",(req,res) => {
  User.findOne({_id: req.user.user_id})
    .exec((result) => {
      if(result){
        return res.status(200).send(result)
      }else {
        return res.status(404).send({
          message: "User not found!"
        })
      }
    });
})

Router.post("/", async (req,res) => {
  const name = req.body.name;
  const userId= req.user.user_id;
  const phoneNo = req.user.phone_number;
  const medicalDetails = req.body.medicalDetails
  const user = new User({
    name,
    userId,
    phoneNo,
    medicalDetails
  });
  try{
    await user.save();
    return res.status(200).send(user)
  }catch (err) {
    next(err)
  }
})

module.exports = Router