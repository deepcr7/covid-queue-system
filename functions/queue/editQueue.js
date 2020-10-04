const Queue = require("../../models/Queue")
const Doctor = require("../../models/Doctor")
const Admin = require("../../models/Admin")
const User = require("../../models/User")
const Token = require("../../models/TokenNumber")

module.exports = async (req,res) => {
  const {adminId} = req.body
  if(adminId){
    //to check if the admin is present in the db
    const admin = await Admin.findOne({_id: adminId});
    if(admin){
      Queue.findById(req.params.id)
      .then(queue => {
        let current = queue.currentPosition;
        let next = queue.nextPosition
        //to check if no one is present in the queue
        if(current ==0 && next == 1){
          res.status(500).send({
            message: "since there is only one person, you cant make any changes"
          })
        } 
        //to check if there is a queue but there is no nextPosition
        else if(current == 0){
          Token.findOne({queue: req.params.id}).populate('user')
          .exec()
          .then(newToken => {
            queue.currentPosition = newToken.number;
            queue.save((err, updatedQueue) => {
              if(err){
                res.status(500).send({
                  message: "Unable to update queue"
                })
              } else{
                let response = {
                  queueId: queue._id,
                  current: updatedQueue.currentPosition.toString()
                }
                res.status(200).send(response)
              }
            })
          })
          .catch(err => {
            res.status(500).send({
              message: "Unable to update queue!"
            })
          })
        } //to cater to a non-empty queue
        else{
              Token.find({queue: req.params.id})
              .populate('user')
              .exec()
              .then(token => {
                let currentToken = token[0];
                //check if there is more than 1 token number
              })

        }
      })
    }
  }
}