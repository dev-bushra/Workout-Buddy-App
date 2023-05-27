const express = require('express')
const {
 getAllWorkouts,
 getSingleWorkout,
 createWorkout,
 updateWorkout,
 deleteWorkout
} = require('../Controllers/workoutController')

const router = express.Router()


// GET
router.get('/', getAllWorkouts)

router.get('/:id', getSingleWorkout)

// POST
router.post('/', createWorkout)

// PATCH
router.patch('/:id', updateWorkout)

// DELETE
router.delete('/:id', deleteWorkout)


module.exports = router