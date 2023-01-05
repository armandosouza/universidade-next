const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minLength: 4
	},
	birth: {
		type: Date,
		required: true
	},
	address: {
		type: String
	},
	avatar: {
		type: String,
		default: "http://cdn.onlinewebfonts.com/svg/img_569204.png"
	},
	courses: {
		type: Array
	},
	achievements: {
		type: Array
	},
	admin: {
		type: Boolean,
		default: false
	},
	profileImg: {
		type: String,
		default: "https://i.imgur.com/CAgG1CB.png"
	},
	status: {
		type: String,
		default: "Estou estudando na Next University!"
	}
})

module.exports = mongoose.model('users', UserSchema)