const verifyToken = require('./verifyToken')
const User = require('../models/User')

const verifyTokenAndAdmin = (req, res, next) => {
	try {
		verifyToken()
		const userId = req.id
		const user = User.findOneById(userId)
		if(!user) {
			return res.status(404).json({msg: "Usuário não foi encontrado!"})
		}

		if(!user.admin) {
			return res.status(403).json({msg: "Você não tem autorização para isso!"})
		}

		next()
	} catch {
		return res.status(500).json({msg: "Erro na autorização!"})
	}
}