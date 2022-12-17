import styled from 'styled-components'

const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10px;
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
	text-shadow: 1px 1px 3px black;
	color: lightgray;
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
	transition: .5s;

	&:hover {
		color: aquamarine;
	}

	&.collapse {
		p {
			display: none;
		}
	}
`

const MenuSidebarIcon = styled.i`
	font-size: 20px;
	margin-bottom: 5px;
	cursor: pointer;
`

const Sidebar = () => {
	
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

	return (
			<SidebarContainer id="sidebar">
				<Top>
					<MenuIcon onClick={collapseSidebar} id="menu" className="fa-solid fa-bars"></MenuIcon>
					<SidebarTitle id="title">Next University</SidebarTitle>
				</Top>
				<MenuSidebar>
					<MenuSidebarList>
						<MenuSidebarItem className="item">
							<MenuSidebarIcon className="fa-solid fa-user-graduate"></MenuSidebarIcon>
							<p>Conta</p>
						</MenuSidebarItem>
						<MenuSidebarItem className="item">
							<MenuSidebarIcon className="fa-solid fa-chalkboard"></MenuSidebarIcon>
							<p>Cursos</p>
						</MenuSidebarItem>
						<MenuSidebarItem className="item">
							<MenuSidebarIcon className="fa-solid fa-book-open"></MenuSidebarIcon>
							<p>Disciplinas</p>
						</MenuSidebarItem>
						<MenuSidebarItem className="item">
							<MenuSidebarIcon className="fa-solid fa-person-chalkboard"></MenuSidebarIcon>
							<p>Notas</p>
						</MenuSidebarItem>
						<MenuSidebarItem className="item">
							<MenuSidebarIcon className="fa-solid fa-book"></MenuSidebarIcon>
							<p>Biblioteca</p>
						</MenuSidebarItem>
						<MenuSidebarItem className="item">
							<MenuSidebarIcon className="fa-solid fa-right-from-bracket"></MenuSidebarIcon>
							<p>Sair</p>
						</MenuSidebarItem>
					</MenuSidebarList>
				</MenuSidebar>
			</SidebarContainer>
		)
}

export default Sidebar