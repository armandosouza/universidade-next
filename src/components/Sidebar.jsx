import styled from 'styled-components'
import axios from 'axios'

import {useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {logout} from '../redux/features/userSlice'

const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 20px;
`

const SidebarTitle = styled.h3`
	font-size: 30px;
	color: lightgray;
	margin-left: 10px;

	&.off {
		display: none;
	}
`

const MenuIcon = styled.i`
	font-size: 27px;
	color: lightgray;
	cursor: pointer;
`

const SidebarContainer = styled.aside`
	background-color: #3e3d53;
	width: 20%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	transition: .5s;

	&.active {
		width: 10%;
	}
`

const MenuSidebar = styled.nav`
	margin: 20px 0;
`

const MenuSidebarList = styled.ul`
	list-style-type: none;
	padding: 0;
`

const MenuSidebarItem = styled.li`
	& a {
		text-shadow: 1px 1px 3px black;
		color: lightgray;
		text-decoration: none;
		padding: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		cursor: pointer;
		transition: .5s;
	}

	&:hover, & a:hover {
		color: aquamarine;
	}

	&.collapse {
		a {
			display: none;
		}
	}
`

const MenuSidebarIcon = styled.i`
	font-size: 20px;
	margin-bottom: 5px;
	cursor: pointer;
`

const Sidebar = ({location}) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	
	const collapseSidebar = () => {
		let sidebar = document.getElementById("sidebar")
		let title = document.getElementById("title")
		let main = document.getElementById("main")
		sidebar.classList.toggle("active")
		title.classList.toggle("off")
		main.style.width = "75%"

		let items = document.getElementsByClassName("item")
		for (let x = 0; x < items.length; x++) {
			items[x].classList.toggle("collapse")
		}
	}

	const handleLogout = () => {
		axios.post('http://localhost:3001/api/auth/logout')
		.then(() => {
			localStorage.removeItem("token")
			dispatch(logout())
			navigate('/login')
		}).catch((e) => {
			console.log(e)
		})
	}

	return (
			<SidebarContainer id="sidebar">
				<Top>
					<MenuIcon onClick={collapseSidebar} id="menu" className="fa-solid fa-bars"></MenuIcon>
					<SidebarTitle id="title">Next University</SidebarTitle>
				</Top>
				<MenuSidebar>
					<MenuSidebarList>
						<MenuSidebarItem className="item">
							<Link to={`${location}/perfil`}>
								<MenuSidebarIcon className="fa-solid fa-user-graduate"></MenuSidebarIcon>
								Conta
							</Link>
						</MenuSidebarItem>
						<MenuSidebarItem className="item">
							<Link to={`${location}/cursos`}>
								<MenuSidebarIcon className="fa-solid fa-chalkboard"></MenuSidebarIcon>
								Cursos
							</Link>
						</MenuSidebarItem>
						<MenuSidebarItem className="item">
							<Link to={`${location}/disciplinas`}>
								<MenuSidebarIcon className="fa-solid fa-book-open"></MenuSidebarIcon>
								Disciplinas
							</Link>
						</MenuSidebarItem>
						<MenuSidebarItem className="item">
							<Link to={`${location}/notas`}>
								<MenuSidebarIcon className="fa-solid fa-person-chalkboard"></MenuSidebarIcon>
								Notas
							</Link>
						</MenuSidebarItem>
						<MenuSidebarItem className="item">
							<Link to="#">
								<MenuSidebarIcon className="fa-solid fa-book"></MenuSidebarIcon>
								Biblioteca
							</Link>
						</MenuSidebarItem>
						<MenuSidebarItem className="item">
							<Link onClick={handleLogout}>
								<MenuSidebarIcon className="fa-solid fa-right-from-bracket"></MenuSidebarIcon>
								Sair
							</Link>
						</MenuSidebarItem>
					</MenuSidebarList>
				</MenuSidebar>
			</SidebarContainer>
	)
}

export default Sidebar