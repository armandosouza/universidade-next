import styled from 'styled-components'
import logo from '../assets/remove.png'

const Menu = styled.div`
	position: relative;
	top: 10px;
	width: 90%;
	margin: 0 auto;
	border-radius: 10px;
	background-color: white;
	box-shadow: 1px 3px 7px gray;
	display: flex;
	justify-content: space-between;
`

const Left = styled.div`
	display: flex;
	align-items: center;
`

const Logo = styled.img`
	width: 70px;
	margin-left: 10px;
`

const Right = styled.div`
	display: flex;
	align-items: center;
`

const Title = styled.h1`
	margin: 0;
	color: skyblue;
`

const ItemMenu = styled.div`
	text-transform: uppercase;
	font-size: 1.1rem;
	font-weight: bold;
	color: purple;
	height: inherit;
	margin: 0 15px;
	cursor: pointer;

	&:hover {
		a, a:visited,  a:link {
			color: #797ee6;
		}
	}

	a:visited, a:link, a {
		text-decoration: none;
		color: purple;
	}
`

const Button = styled.span`
	height: inherit;
	background-color: #797ee6;
	padding: 7px 12px;
	border-radius: 20px;
	box-shadow: 1px 1px 4px black;
	margin: 0 15px;
	cursor: pointer;
	transition: .5s;

	&:hover {
		background-color: skyblue;

		& a:visited, a:link {
			color: whitesmoke;
		}
	}

	& a:visited, a:link {
		transition: .5s;
		color: white;
		font-weight: bold;
		text-transform: uppercase;
		font-size: 1.1rem;
		text-decoration: none; 
	}
`

const MenuNavbar = () => {
	return (
		<Menu>
			<Left>
				<a href="/"><Logo src={logo}/></a>
				<Title>Universidade Next</Title>
			</Left>
			<Right>
				<ItemMenu><a href="/sobre">Sobre</a></ItemMenu>
				<ItemMenu><a href="/login">Alumni</a></ItemMenu>
				<ItemMenu><a href="/cursos">Cursos</a></ItemMenu>
				<ItemMenu><a href="/">Acadêmico</a></ItemMenu>
				<ItemMenu><a href="/#eventos">Eventos</a></ItemMenu>
				<Button><a href="/registro">Matricule-se</a></Button>
			</Right>
		</Menu>
	)
}

export default MenuNavbar