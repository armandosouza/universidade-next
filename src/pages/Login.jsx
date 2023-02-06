import styled from 'styled-components'
import {device} from '../responsive'
import axios from 'axios'
import {endpoints} from '../request'

import {useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import {saveUser} from '../redux/features/userSlice'

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
	color: whitesmoke;
	text-align: center;
	text-shadow: 1px 1px 3px black;
	padding: 30px 0;
	color: skyblue;
`

const Subtitle = styled.h3`
	font-size: 24px;
	text-align: center;
	position: absolute;
	color: black;
	top: 20px;
`

const FormLogin = styled.form`
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

	@media ${device.mobileP} {
		width: 90%;
		height: 70%;
		top: 15%;
		left: 15%;
	}
`

const Warning = styled.span`
	padding: 0 20px;
	font-size: 15px;
	color: ${props => props.color};
`

const ForgotPassword = styled.h5`
	padding-bottom: 10px;

	& a:visited, a:link {
		color: blue;
		text-decoration: none;
		font-size: 14px;
	}
`

const ContainerButton = styled.div`
	display: flex;
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
`

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')
	const [color, setColor] = useState('red')

	const navigate = useNavigate()
	const user = useSelector(state => state.user[0])

	useEffect(() => {
		document.title = 'Next University | Entrar na conta'
		if(user) {
			navigate(`${user.url}`)
		}
	}, [])



	const userLogin = (e) => {
		e.preventDefault()
		axios.post(`${endpoints.auth}/login`, {
			email: email,
			password: password
		}).then((response) => {
			const userAuth = response.data.userAuth
			const user = response.data.user
			localStorage.setItem('token', userAuth.token)
			setColor('green')
			setMsg(response.data.msg)

			setTimeout(() => {
				navigate(`/dashboard/${userAuth.id}`)
			}, 2000)
		}).catch((response) => {
			setMsg(response.response.data.msg)
		})
	}

	return (
		<Container>
			<Title>Next Alumni</Title>
			<FormLogin method="POST" action="">
				<Subtitle>Entre na sua conta</Subtitle>
				<Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Digite seu email" icon="fa-solid fa-user"/>
				<Input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Digite sua senha" icon="fa-solid fa-key"/>
				<Warning color={color} id="warning">{msg}</Warning>
				<ForgotPassword>
					<Link to="/trocar-senha">Esqueceu a senha?</Link>
				</ForgotPassword>
				<ContainerButton>
					<Button onClick={userLogin}>Login</Button>
					<Button onClick={() => navigate('/registro')}>Registrar-se</Button>
				</ContainerButton>
			</FormLogin>
		</Container>
		)
}

export default Login