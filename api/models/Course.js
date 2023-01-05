const mongoose = require("mongoose")

const CourseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	},
	tag: {
		type: String,
		default: "Curso"
	},
	img: {
		type: String,
		default: "https://assets-global.website-files.com/5e39e095596498a8b9624af1/5f18321b82797afe4defe702_101%20crashcourse.jpg"
	},
	lessons: {
		type: Array
	},
	students: {
		type: Array
	}
})

module.exports = mongoose.model('courses', CourseSchema)