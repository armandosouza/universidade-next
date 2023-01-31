import styled from 'styled-components'
import {endpoints} from '../request'

import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'
import Input from '../components/Input'

const Container = styled.div`
	background: url('https://images7.alphacoders.com/109/1091571.png');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	height: 100vh;
	width: 100vw;
	position: relative;
`

const Title = styled.h2`
	font-size: 50px;
	color: skyblue;
	text-align: center;
	text-shadow: 1px 1px 3px black;
	padding: 30px 0;
`

const FormRegister = styled.form`
	position: absolute;
	height: 50%;
	margin: auto 0;
	background: white;
	width: 50%;
	top: 25%;
	left: 25%;
	border-radius: 5px;
	box-shadow: 2px 3px 7px black;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const Subtitle = styled.h3`
	font-size: 24px;
	text-align: center;
	position: absolute;
	color: black;
	top: 10px;
`

const Inputs = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-top: 20px;
`

const Back = styled.h5`
	& a:visited, a:link {
		color: blue;
		text-decoration: none;
		font-size: 14px;
	}
`

const Button = styled.button`
	margin-top: 15px;
	margin-left: 15px;
	border-radius: 9px;
	transition: .5s;
	background-color: skyblue;
	padding: 8px 30px;
	box-shadow: 2px 4px 8px black;
	border: none;
	cursor: pointer;
	font-weight: bold;
	font-size: 15px;
	font-family: 'Didact Gothic', sans-serif;
	color: black;
	text-transform: uppercase;

	&:hover {
		background-color: #797ee6;
	}

	& a:link, a:visited {
	}
`

const Warning = styled.span`
	padding: 0 20px;
	font-size: 15px;
	color: ${props => props.color};
`

const Register = () => {
	const [nome, setNome] = useState("")
	const [email, setEmail] = useState("")
	const [data, setData] = useState("")
	const [senha, setSenha] = useState("")
	const [confirmaSenha, setConfirmaSenha] = useState("")
	const [msg, setMsg] = useState("")
	const [color, setColor] = useState("red")

	const navigate = useNavigate()

	useEffect(() => {
		document.title = 'Next University | Registre-se'
	}, [])

	const submitUser = (e) => {
		e.preventDefault()
		if(senha !== confirmaSenha) {
			setMsg("Senhas não combinam")

		} else if(nome === "" || email === "" || data === "" || senha === "" || confirmaSenha === "") {
			setMsg("Campo(s) inválido(s)")

		} else if(senha.length < 4) {
			setMsg("A senha não pode ter menos que 4 caracteres")

		} else {

			try {
				axios.post(`${endpoints.auth}/register`, {
					name: nome,
					email: email,
					birth: data,
					password: senha
				}).then((response) => {
					setColor("green")
					setMsg(response.data.msg)

					setTimeout(() => {
						navigate('/login')
					}, 4000)
				}).catch((response) => {
					setMsg(response.response.data.msg)
				})
			} catch {
				setMsg("Houve um erro ao realizar o cadastro!")
				setColor("red")
			}
		}
	}

	return (
		<Container>
			<Title>Next Alumni</Title>
			<FormRegister method="POST" action="">
				<Subtitle>Crie sua conta acadêmica</Subtitle>
				<Inputs>
					<Input onChange={(e) => setNome(e.target.value)} style={{width: "40%"}} id="nome" type="text" name="nome" placeholder="Digite seu nome completo" icon="fa-solid fa-user" value={nome} required/>
					<Input onChange={(e) => setEmail(e.target.value)} style={{width: "40%"}} id="email" type="email" name="email" placeholder="Digite seu email" icon="fa-solid fa-envelope" value={email} required/>
					<Input onChange={(e) => setData(e.target.value)} style={{width: "40%"}} id="nascimento" type="date" name="nascimento" placeholder="Digite sua data de nascimento" value={data} required/>
					<Input onChange={(e) => setSenha(e.target.value)} style={{width: "40%"}} id="senha" type="password" name="senha" placeholder="Digite sua senha" icon="fa-solid fa-key" value={senha} required/>
					<Input onChange={(e) => setConfirmaSenha(e.target.value)} style={{width: "40%"}} id="senha2" type="password" name="senha2" placeholder="Digite sua senha novamente" icon="fa-solid fa-key" value={confirmaSenha} required/>
				</Inputs>
				<Warning color={color} id="warning">{msg}</Warning>
				<Back>
					<Link to="/login">Já possuo conta</Link>
				</Back>
				<Button onClick={submitUser}>Cadastrar</Button>
			</FormRegister>
		</Container>
		)
}

export default Register