import styled from 'styled-components'

const Container = styled.div`
	width: 100%;
	background: white;
`

const Top = styled.div`
	display: flex;
	align-items: center;
`

const SidebarTitle = styled.h3`
	font-size: 30px;
	color: lightgray;
`

const Menu = styled.i`
	font-size: 27px;
	color: lightgray;
	margin: 0 10px;
	cursor: pointer;
`

const Sidebar = styled.aside`
	background-color: #3e3d53;
	width: 20%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	transition: .5s;
`

const Dashboard = () => {
	
	const openSidebar = () => {
		let sidebar = document.getElementById("sidebar")
		sidebar.style.display = "none"
	}

	return (
		<Container>
			<Sidebar id="sidebar">
				<Top>
					<Menu onClick={openSidebar} id="menu" className="fa-solid fa-bars"></Menu>
					<SidebarTitle>Next University</SidebarTitle>
				</Top>
			</Sidebar>
		</Container>
		)
}

export default Dashboard