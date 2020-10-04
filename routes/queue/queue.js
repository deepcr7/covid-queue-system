const Router = require("express").Router()
const Doctor = require("../../models/Doctor")
const Queue = require("../../models/Queue")

//get an individual queue for a particular doctor
Router.get('/:queueId', (req,res) => {
  Queue.findById(req.params.queueId)
  .populate('DoctorId')
  .exec()
  .then(queue => {
    res.status(200).send(queue);
  })
  .catch(err => {
    next(err)
  })
});

//edit facility provided to admin to edit the queue

