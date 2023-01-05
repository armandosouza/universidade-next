import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'

import logo from '../assets/remove.png'

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(90deg, #ce9ffc, #7367fd);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: whitesmoke;
`

const Logo = styled.img`
	width: 200px;
`

const Title = styled.h2`
	font-size: 40px;
	text-shadow: 1px 1px 3px black;
`

const Subtitle = styled.h3`
	margin: 20px 0;
`

const Button = styled.span`
	padding: 10px 30px;
	background: linear-gradient(90deg, #abdcff, #0396ff);
	transition: .5s;
	cursor: pointer;
	font-size: 20px;
	color: black;
	font-weight: bold;
	border-radius: 9px;
	border: 2px solid black;

	&:hover {
		border: 2px solid aquamarine;
	}
`

const ErrorPage = () => {
	const navigate = useNavigate()

	return (
		<Container>
			<Logo src={logo} />
			<Title>Erro 404</Title>
			<Subtitle>Ops! Página não encontrada! Clique no botão abaixo para voltar</Subtitle>
			<Button onClick={() => navigate(-1)}>Voltar</Button>
		</Container>
		)
}

export default ErrorPage