import styled from 'styled-components'
import {device} from '../responsive'
import logo from '../assets/remove.png'

import {Link} from 'react-router-dom'

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

	@media ${device.mobileMax}, @media ${device.mobileLMax} {
		overflow-x: scroll;

		::-webkit-scrollbar {
			height: 7px;
		}

		::-webkit-scrollbar-track {
			background: lightgray;
			border-radius: 30px;
		}

		::-webkit-scrollbar-thumb {
			background: gray;
			border-radius: 30px;
		}
	}
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
				<Link to="/"><Logo src={logo}/></Link>
				<Title>Universidade Next</Title>
			</Left>
			<Right>
				<ItemMenu><Link to="/sobre">Sobre</Link></ItemMenu>
				<ItemMenu><Link to="/login">Alumni</Link></ItemMenu>
				<ItemMenu><Link to="/cursos">Cursos</Link></ItemMenu>
				<ItemMenu><Link to="/">Acadêmico</Link></ItemMenu>
				<ItemMenu><Link to="/#eventos">Eventos</Link></ItemMenu>
				<Button><Link to="/registro">Matricule-se</Link></Button>
			</Right>
		</Menu>
	)
}

export default MenuNavbar