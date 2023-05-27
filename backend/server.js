require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workout') 

const app = express()

// Middleware
app.use(express.json())

app.use((req, res, next) => {
 console.log(req.path, req.method)
 next()
})

// connect to db
mongoose.connect(process.env.MONGO_DB)
 .then(() => {
  // listen for requests
  app.listen(process.env.PORT, () => {
  console.log('connected to db and listen on port:', process.env.PORT);
  })
 })
 .catch((error) => {
  console.log(error);
 }) 

// Home Routes
app.get('/', (req, res) => {
 res.json({msg: 'welcome to MERN app'})
})

// Workout Routes
app.use('/api/workout', workoutRoutes)
