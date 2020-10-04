const Queue = require("../../models/Queue")
const Token = require("../../models/TokenNumber")
const Router = require('express').Router
const AuthHandler = require("../../middlewares/authHandler")

//to get a particular reservation 
Router.get("/:id", authHandler,(req,res,next) => {
  Token.findById(req.params.id)
  .populate({path: 'queue', populate: {path: 'queueId'}})
  .exec()
  .then(token => {
    if(token){
      res.status(200).send(token)
    }else{
      res.status(404).send({
        message: "Your reservation was not found"
      })
    }
  })
  .catch(err => {
    next(err)
  })
})


//to enter a specific queue(by id), and create a new reservation
Router.post("/:id",AuthHandler, (req,res,next) => {
  //to check if the user is already in the queue
  Token.findOne({user: req.user.user_id, queue: req.params.id})
  .then(result => {
    if(result){
      res.status(403).send({
        message: "Already present in existing queue!"
      })
    }else {
      Queue.findOne({_id: req.params.id})
      .populate('DoctorId')
      .exec()
      .then(queue => {
        let position = queue.nextPosition
        let newToken = new Token({
          user: req.user.user_id,
          queue: req.params.id,
          number: position
        })
        Token.addToken(newToken, (err,token) => {
          if(err){
            res.status(500).send({
              message:"Failed to enter the queue",err
            })
          }else{
            //change the nextPosition to one more
            Queue.findOneAndUpdate({_id: req.params.id}, {nextPosition: position+1},{
              new: true,
              runValidators: true
            })
            .then(newQueue => {
              let response =token.toObject();
              response.queue = queue
              res.status(200).send({
                message:"You have entered the Queue!"
              })
            })
            .catch(err => {
              res.status(500).send({
                message: "You have failed enter the queue!"
              })
            })
          }
        })
      })
    }
  })
})



