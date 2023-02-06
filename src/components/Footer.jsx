import styled from 'styled-components'

const Container = styled.footer`
	width: 100%;
	background-color: #6305dc;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: white;
	position: relative;
	padding: 20px 0;
`

const Logo = styled.img`
	width: 100px;
	margin-bottom: 10px;
`

const FooterTitle = styled.h2`
	font-size: 28px;
	margin-bottom: 10px;
`

const FooterSub = styled.h3`
	text-align: center;
`

const Copyright = styled.h5`
	text-align: center;
	margin-top: 10px;
`

const Footer = () => {
	return (
		<Container>
			<Logo src="https://cdn-icons-png.flaticon.com/512/2201/2201570.png"/>
			<FooterTitle>Universidade Next</FooterTitle>
			<FooterSub>Encontre seu caminho. Siga seus passos. Estude. Progrida. Alcance.</FooterSub>
			<Copyright>&copy; 2022 - Todos os direitos reservados.</Copyright>
		</Container>
		)
}

export default Footer