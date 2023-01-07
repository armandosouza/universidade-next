const router = require("express").Router()
const Course = require("../models/Course")
const verifyToken = require("../requests/verifyToken")
const verifyTokenAndAdmin = require("../requests/verifyTokenAndAdmin")

//get a course
router.get('/:id', verifyToken, (req, res) => {
	try {
		const courseId = req.params.id
		const course = Course.findOneById(courseId)

		if(!course) {
			return res.status(404).json({msg: "Curso não encontrado!"})
		}

		res.status(200).json(course)
	} catch {
		res.status(400).json({msg: "Erro ao carregar curso!"})
	}
})



module.exports = router