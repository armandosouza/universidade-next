import styled from 'styled-components'

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
	box-shadow: 1px 1px 4px black;
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
	top: 20px;
`

const Inputs = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-top: 20px;
`

const Back = styled.h5`
	padding-bottom: 10px;

	& a:visited, a:link {
		color: blue;
		text-decoration: none;
		font-size: 14px;
	}
`

const Button = styled.span`
	margin-top: 15px;
	margin-left: 15px;
	border-radius: 9px;
	transition: .5s;
	background-color: skyblue;
	padding: 8px 30px;
	box-shadow: 2px 4px 8px black;
	border: none;
	cursor: pointer;

	&:hover {
		background-color: #797ee6;
	}

	& a:link, a:visited {
		font-weight: bold;
		font-size: 15px;
		color: black;
		text-transform: uppercase;
		text-decoration: none;
	}
`

const Register = () => {
	return (
		<Container>
			<Title>Next Alumni</Title>
			<FormRegister method="POST">
				<Subtitle>Crie sua conta acadêmica</Subtitle>
				<Inputs>
					<Input style={{width: "40%"}} id="nome" type="text" name="nome" placeholder="Digite seu nome completo" icon="fa-solid fa-user" required/>
					<Input style={{width: "40%"}} id="email" type="email" name="email" placeholder="Digite seu email" icon="fa-solid fa-envelope" required/>
					<Input style={{width: "40%"}} id="nascimento" type="date" name="nascimento" placeholder="Digite sua data de nascimento" required/>
					<Input style={{width: "40%"}} id="senha" type="password" name="senha" placeholder="Digite sua senha" icon="fa-solid fa-key" required/>
					<Input style={{width: "40%"}} id="senha" type="password" name="senha" placeholder="Digite sua senha novamente" icon="fa-solid fa-key" required/>
				</Inputs>
				<Back>
					<a href="/login">Já possuo conta</a>
				</Back>
				<Button><a href="#">Cadastrar</a></Button>
			</FormRegister>
		</Container>
		)
}

export default Register