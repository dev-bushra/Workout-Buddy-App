const workoutModel = require('../models/workoutModel')
const mongoose = require('mongoose')

// GET ALL
const getAllWorkouts = async (req, res) => {

 // 1. find all document and store them in this var
 const allWorkouts = await workoutModel.find({}).sort({ createAt: -1 })
 
 // 2. return this var in json format
 res.status(200).json(allWorkouts)
}


// GET ONE
const getSingleWorkout = async (req, res) => {

 // 1. get the id
 const { id } = req.params

 // 2. check if id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(404).json({error: 'id is not valid'})
 }

 // 3. find the document in db and return the search result in this var
 const singleWorkout = await workoutModel.findById(id)

 // 4. check if the document is not found
 if (!singleWorkout) {
  return res.status(400).json({error: 'now such workout'})
 }
 
 // 5. if document found return it in json format
 res.status(200).json(singleWorkout)
} 


// CREATE NEW
const createWorkout = async (req, res) => {
 
 // 1. get the req.body vars
 const { title, reps, load } = req.body

 // try save on db and catch errors
 try {

  // 2. create a new document and store the req.body data on it using ur Schema and save the new document in this var
  const newWorkoutObj = await workoutModel.create({ title, reps, load })

  // 3. return the new document in json format 
  res.status(200).json(newWorkoutObj)
 } catch (error) {
  // 4. if there is errors while adding this document show it
  res.status(400).json({error: error.message})
 }
}


// UPDATE
const updateWorkout = async (req, res) => {
 
 // 1. get the id
 const { id } = req.params

 // 2. check if the id is valid
 if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(404).json({error: 'id is not valid'})
 }

 // 3. update the document
 const workout = workoutModel.findOneAndUpdate({ _id: id }, { ...req.body })
 
 // 4. check if the document is not found
 if (!workout) {
  return res.status(400).json({error: 'no such workout'})
 }

 // 5. if document found return it in json format
 res.status(200).json(workout)
}


// DELETE
const deleteWorkout = async (req, res) => {
 
 // 1. get the document id
 const { id } = req.params

 // 2. check if the id is valid id
 if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(404).json({ error: 'id is not valid' })
 }

 // 3. find and delete that document and return it in this var
 const workout = await workoutModel.findByIdAndDelete({ _id: id })
 
 // 4. check if the document is not found
 if (!workout) {
  return res.status(400).json({error: 'no such workout'})
 }

 // 5. if document found return it in json format
 res.status(200).json(workout)
}


module.exports = {
 getAllWorkouts,
 getSingleWorkout,
 createWorkout,
 updateWorkout,
 deleteWorkout
}
