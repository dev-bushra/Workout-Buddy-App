require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workout') 

const app = express()

// Middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(
        "\n######### \n",
        "\n Request Path:",
        req.path,
        "\n Request Method:",
        req.method
    );
    next()
})

// Connect to DB
mongoose.connect(process.env.MONGO_DB)
    .then(() => { 
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB & Listen on Port:', process.env.PORT);
        })
    })
    .catch((error) => { console.log(error); }
) 

// Routes
app.get('/', (req, res) => {
    res.send('Hello from Workout Buddy App')
})
app.use('/api/workout', workoutRoutes) 
