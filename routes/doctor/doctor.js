const Router = require("express").Router()
const Doctor = require("../../models/Doctor")


Router.get("/", (req,res) => {
  Doctor.findById({_id: req.user.user_id})
  .exec((result) => {
    if(result){
      return res.status(200).send(result)
    }else {
      return res.status(404).send({
        message: "Doctor not found!"
      })
    }
  });
})

Router.post("/", async (req,res) => {
  const name = req.body.name;
  const userId= req.user.user_id;
  const phoneNo = req.user.phone_number;
  const user = new Doctor({
    name,
    userId,
    phoneNo,
  });
  try{
    await user.save();
    return res.status(200).send(user)
  }catch (err) {
    next(err)
  }
})

module.exports = Router