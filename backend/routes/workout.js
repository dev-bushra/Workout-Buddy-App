const express = require('express')
const {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
} = require('../Controllers/workoutController')

const router = express.Router()

router.get('/', getAllWorkouts)
router.get('/:id', getSingleWorkout)
router.post('/', createWorkout)
router.patch('/:id', updateWorkout)
router.delete('/:id', deleteWorkout)

module.exports = router