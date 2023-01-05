const router = require("express").Router()
const User = require("../models/User")
const verifyToken = require("../requests/verifyToken")

//get a user
router.get('/:id', verifyToken, async (req, res) => {
	try {
		const userId = req.params.id
		const user = await User.findById(userId, '-password')

		if(!user) {
			return res.status(404).json({msg: "Perfil não encontrado ou inexistente!"})
		}

		return res.status(200).json({user})
	} catch (e) {
		return res.status(402).json({msg: "Houve um erro ao carregar perfil!"})
	}
})


//edit a user
router.put('/edit/:id', verifyToken, async (req, res) => {
	const profileImg = req.body.profileImg
	const avatar = req.body.avatar
	const status = req.body.status

	const userId = req.params.id
	if (req.id !== userId) {
		return res.status(403).json({msg: "Você não tem autorização para isso!"})
		
	} else {
		try {
			const user = await User.findByIdAndUpdate(userId, {
				profileImg,
				avatar,
				status
			}, {
				new: true
			})
			user.save()
			console.log(user)
			return res.status(200).json({user, msg: "Perfil editado com sucesso!"})	
		} catch(e) {
			console.log(e)
			return res.status(500).json({msg: "Houve um erro ao editar seu perfil!"})
		}
	}
})


module.exports = router