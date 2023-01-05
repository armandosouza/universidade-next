const router = require("express").Router()
const Course = require("../models/Course")
const verifyToken = require("../requests/verifyToken")

//get a course
router.get('/:id', verifyToken, (req, res) => {
	console.log('a')
})

module.exports = router