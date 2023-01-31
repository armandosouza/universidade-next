import styled from 'styled-components'

import {useSelector} from 'react-redux'
import {useNavigate, useLocation} from 'react-router-dom'

const Container = styled.aside`
	background-color: #3e3d53;
	width: 20%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	transition: .5s;
`

const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 20px;
`

const MenuIcon = styled.i`
	font-size: 27px;
	color: lightgray;
	margin-right: 10px;
	transition: .5s;
`

const SidebarTitle = styled.h3`
	font-size: 30px;
	color: lightgray;
`

const Menu = styled.div`
	width: 100%;
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const MenuItem = styled.div`
	display: flex;
	align-items: center;
	margin: 10px;
	color: lightgray;
	font-size: 18px;
	transition: .5s;
	cursor: pointer;
	text-align: center;

	&:hover {
		color: aquamarine;

		& i{
			color: aquamarine;
		}
	}
`

const SidebarStudy = ({subjects}) => {
	const navigate = useNavigate()
	const url = useLocation()
	const user = useSelector(state => state.user[0])

	return (
		<Container>
			<Top>
				<MenuIcon className="fa-solid fa-bars"></MenuIcon>
				<SidebarTitle>Next Study</SidebarTitle>
			</Top>
			<Menu>
				{subjects &&
					subjects.map((subject) => (
						<MenuItem key={subject._id} onClick={() => navigate(`${url.pathname}/${subject._id}`)}>
							<MenuIcon style={{fontSize: "22px"}} className="fa-solid fa-book"></MenuIcon>
							{subject.name || subject.title}
						</MenuItem>
					))	
				}
				<MenuItem onClick={() => navigate(-1)} style={{marginTop: "10px"}}>
					<MenuIcon style={{fontSize: "22px"}} className="fa-solid fa-arrow-left"></MenuIcon>
					Voltar
				</MenuItem>
				<MenuItem onClick={() => navigate(`${user.url}/cursos`)} style={{marginTop: "10px"}}>
					<MenuIcon style={{fontSize: "22px"}} className="fa-solid fa-right-from-bracket"></MenuIcon>
					Sair
				</MenuItem>
			</Menu>
		</Container>
	)
}

export default SidebarStudy