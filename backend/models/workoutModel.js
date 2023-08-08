const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    reps: {
        type: Number
    },
    load: {
        type: Number
    }
})


module.exports = mongoose.model('workout', workoutSchema)