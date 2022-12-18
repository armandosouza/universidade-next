const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")

//register a user
router.post("/register", async (req, res) => {
	try {
		const checkUser = await User.findOne({email: req.body.email})

		if(req.body.password.length < 4 || req.body.password.length > 20) {
			return res.status(422).json({msg: "Senha muito curta ou muito longa!"})
		}
		else if(req.body.name === "" || req.body.email === "" || req.body.password === "" || req.body.birth === "") {
			return res.status(422).json({msg: "Campo(s) inválido(s)!"})
		}
		else if(checkUser) {
			return res.status(422).json({msg: "Email já cadastrado!"})
		}

		const hashedPassword = await bcrypt.hash(req.body.password, 10).then(hash => {
			return hash
		})

		const newUser = new User({
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
			birth: req.body.birth
		})

		newUser.save()
		res.status(200).json({
			msg: "Usuário registrado com sucesso!"
		})
		console.log("Adicionado com sucesso!")
	} catch(e) {
		console.log(e)
	}
})

//login
router.post('/login', async (req, res) => {
	try {
		const user = await User.findOne({email: req.body.email})

		if (!user) {
			return res.status(422).json({msg: "Email não está vinculado a nenhuma conta!"})
		} else {
			bcrypt.compare(req.body.password, user.password, (err, result) => {
				if(result) {
					return res.status(200).json({msg: "Login feito com sucesso!"})
				} else {
					return res.status(422).json({msg: "Senha incorreta!"})
				}
			})
		}
	} catch (e) {
		res.status(422).json({msg: "Houve um erro ao realizar o login!"})
	}
})

module.exports = router