const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

require("dotenv").config();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const authHandler = require("./middlewares/authHandler");

//importing mongoose models
const Admin= require("./models/Admin")
const Doctor = require("./models/Doctor");
const Queue = require("./models/Queue");
const User = require("./models/User")
const TokenNumber = require("./models/TokenNumber")
const userRouter = require("./routes/user/user")

mongoose.connection.on('error', console.error.bind(console, 'connection error: '))
mongoose.connection.once('open',  async () => {
  console.log('db connected')
  await Promise.all([Admin.init(), Doctor.init(), User.init(), Queue.init(), TokenNumber.init()]);
  app.use("/user", authHandler, userRouter)
  //error handling
app.use((err, req, res, next) => {
  console.log(err)
  return res.status(400).send({
    message: err.message,
  });
});
})


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`)
});