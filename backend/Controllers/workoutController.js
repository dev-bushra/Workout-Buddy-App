const mongoose = require('mongoose')
const workoutModel = require('../models/workoutModel')


const getAllWorkouts = async (req, res) => {
    const allWorkouts = await workoutModel.find({}).sort({ createAt: -1 })
    res.status(200).json(allWorkouts)
}

const getSingleWorkout = async (req, res) => {
    const { id } = req.params
    
    // check if id is not valid
    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({ error: 'id is not valid' })
    }

    const singleWorkout = await workoutModel.findById(id)

    // check if document is not found
    if (!singleWorkout) {
        return res.status(400).json({ error: 'document is not found in the db' })
    }
    
    res.status(200).json(singleWorkout)
} 

const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body

    try {
            const newWorkoutObj = await workoutModel.create({ title, reps, load })
            res.status(200).json(newWorkoutObj)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateWorkout = async (req, res) => {
    const { id } = req.params;

    // check if id is not valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "id is not valid" });
    }

    const workout = workoutModel.findOneAndUpdate({ _id: id }, { ...req.body });

    // check if document is not found
    if (!workout) {
        return res.status(400).json({ error: 'document is not found in the db' });
    }

    res.status(200).json(workout);
}

const deleteWorkout = async (req, res) => {
    const { id } = req.params

    // check if the id is valid 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'id is not valid' })
    }

    const workout = await workoutModel.findByIdAndDelete({ _id: id })
    
    // check if the document is not found
    if (!workout) {
        return res.status(400).json({ error: 'document is not found in the db' })
    }

    res.status(200).json(workout)
}


module.exports = {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
}
