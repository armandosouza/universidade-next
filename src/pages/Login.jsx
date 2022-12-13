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
	box-shadow: 1px 1px 4px black;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
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

const Login = () => {
	return (
		<Container>
			<Title>Next Alumni</Title>
			<FormLogin method="POST">
				<Subtitle>Entre na sua conta</Subtitle>
				<Input id="matricula" name="matricula" type="text" placeholder="Digite sua matrícula" icon="fa-solid fa-user"/>
				<Input id="senha" name="senha" type="password" placeholder="Digite sua senha" icon="fa-solid fa-key"/>
				<ForgotPassword>
					<a href="/trocar-senha">Esqueceu a senha?</a>
				</ForgotPassword>
				<ContainerButton>
					<Button><a href="#">Login</a></Button>
					<Button><a href="/registro">Registrar-se</a></Button>
				</ContainerButton>
			</FormLogin>
		</Container>
		)
}

export default Login