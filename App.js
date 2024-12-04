const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3000


const commonRouter = require('./Router/CommonRouter')
const userRouter = require('./Router/UserRouter')



app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
app.use('/user',userRouter)
app.use('/',commonRouter)




mongoose.connect(process.env.MONGOURI || 'mongodb://localhost:27017/pointsapp')
  .then(() => {
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
    console.log('Database connected');
  })
  .catch((error) => console.log('connection error', error));