import styled from 'styled-components'

import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import Sidebar from '../../components/Sidebar'
import Tasks from '../../components/Tasks'
import Grades from '../../components/Grades'
import Avatar from '../../components/Avatar'

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	position: relative;
`

const Main = styled.div`
	
`

const SidebarRight = styled.aside`
	height: 100vh;
	width: 15%;
	background-color: #7f7d9c;
`

const StudentDisciplines = () => {
	const user = useSelector(state => state.user[0])
	const navigate = useNavigate()
	if(!user) {
		navigate('/login')
	}

	return (
		<Container>
			<Sidebar location={user.url}/>
			<Main id="main">
				
			</Main>
			<SidebarRight>
				
			</SidebarRight>
		</Container>
		)
}

export default StudentDisciplines