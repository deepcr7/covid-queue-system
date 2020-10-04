const Router = require("express").Router()
const Admin = require("../../models/Admin")


Router.get("/", (req,res) => {
  Admin.findById({_id: req.user.user_id})
  .exec((result) => {
    if(result){
      return res.status(200).send(result)
    }else {
      return res.status(404).send({
        message: "Admin not found!"
      })
    }
  });
})

Router.post("/", async (req,res) => {
  const name = req.body.name;
  const userId= req.user.user_id;
  const phoneNo = req.user.phone_number;
  const user = new Admin({
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