import styled from 'styled-components'

import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import Sidebar from '../../components/Sidebar'
import ProfileMenu from '../../components/ProfileMenu'
import Tasks from '../../components/Tasks'
import Grades from '../../components/Grades'
import Title from '../../components/Title'

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	position: relative;
`

const Main = styled.div`
	width: 65%;
	height: 100vh;
	overflow-y: scroll;
`

const SidebarRight = styled.aside`
	height: 100vh;
	width: 15%;
	background-color: #7f7d9c;
`

const MyCourses = styled.div`
	padding-top: 5px;
	padding-bottom: 20px;
	width: 100%;
	display: flex;
	overflow-x: scroll;

	::-webkit-scrollbar {
		height: 10px;
	}

	::-webkit-scrollbar-track {
		background: lightgray;
		border-radius: 30px;
	}

	::-webkit-scrollbar-thumb {
		background: gray;
		border-radius: 30px;
	}
`

const MyCourse = styled.div`
	margin: 0 20px;
	min-width: 240px;
	min-height: 280px;
	border-radius: 10px;
	box-shadow: 2px 3px 6px black;
	display: flex;
	align-items: center;
	flex-direction: column;
	position: relative;
`

const MyCourseImage = styled.img`
	object-fit: cover;
	height: 50%;
	width: 100%;
	border-radius: 10px 10px 0 0;
`

const MyCourseTitle = styled.h4`
	color: #006994;
	font-size: 18px;
	text-align: center;
	margin-top: 3px;
	border-bottom: 2px solid gray;
`

const MyCourseDesc = styled.h5`
	color: #006994;
	font-size: 15px;
	text-align: center;
	margin-top: 10px;
`

const MyCourseButton = styled.span`
	font-size: 16px;
	background-color: aquamarine;
	color: #006994;
	padding: 5px 10px;
	width: 50%;
	text-align: center;
	border-radius: 9px;
	cursor: pointer;
	position: absolute;
	bottom: 10px;
	transition: .5s;
	border: 2px solid #006994;

	&:hover {
		background-color: #006994;
		color: lightblue;
	}
`

const Subtitle = styled.h3`
	font-size: 24px;
	text-align: center;
	margin: 10px 0;
`

const CoursesAvailable = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`

const Course = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	padding: 5px 0;
	border-radius: 10px;
	border: 1px solid lightgray;
	font-size: 16px;
`

const Icon = styled.i`
	font-size: 16px;
	margin: 0 5px;
`

const CourseID = styled.span``

const CourseName = styled.h3`
	font-size: 16px;
`
const CourseStudents = styled.span``

const Enroll = styled.span`
	padding: 5px 10px;
	background-color: #006994;
	color: lightblue;
	border-radius: 9px;
	cursor: pointer;

	&:hover {
		background-color: lightblue;
		color: #006994;
	}
`

const StudentCourses = () => {
	const navigate = useNavigate()
	const user = useSelector(state => state.user[0])
	
	if(!user) {
		navigate('/login')
	}

	return (
		<Container>
			<Sidebar location={user.url}/>
			<Main id="main">
				<Title>Cursos</Title>
				<Subtitle>Meus Cursos</Subtitle>
				<MyCourses>
					<MyCourse>
						<MyCourseImage src="https://www.institutodeengenharia.org.br/site/wp-content/uploads/2018/02/Engenharia-Florestal.jpg"/>
						<MyCourseTitle>Engenharia Ambiental</MyCourseTitle>
						<MyCourseDesc>Curso de graduação de Engenharia Ambiental</MyCourseDesc>
						<MyCourseButton><i className="fa-solid fa-right-to-bracket"></i> Entrar</MyCourseButton>
					</MyCourse>
					<MyCourse>
						<MyCourseImage src="https://www.institutodeengenharia.org.br/site/wp-content/uploads/2018/02/Engenharia-Florestal.jpg"/>
						<MyCourseTitle>Engenharia Ambiental</MyCourseTitle>
						<MyCourseDesc>Curso de graduação de Engenharia Ambiental</MyCourseDesc>
						<MyCourseButton><i className="fa-solid fa-right-to-bracket"></i> Entrar</MyCourseButton>
					</MyCourse>
					<MyCourse>
						<MyCourseImage src="https://www.institutodeengenharia.org.br/site/wp-content/uploads/2018/02/Engenharia-Florestal.jpg"/>
						<MyCourseTitle>Engenharia Ambiental</MyCourseTitle>
						<MyCourseDesc>Curso de graduação de Engenharia Ambiental</MyCourseDesc>
						<MyCourseButton><i className="fa-solid fa-right-to-bracket"></i> Entrar</MyCourseButton>
					</MyCourse>
					<MyCourse>
						<MyCourseImage src="https://www.institutodeengenharia.org.br/site/wp-content/uploads/2018/02/Engenharia-Florestal.jpg"/>
						<MyCourseTitle>Engenharia Ambiental</MyCourseTitle>
						<MyCourseDesc>Curso de graduação de Engenharia Ambiental</MyCourseDesc>
						<MyCourseButton><i className="fa-solid fa-right-to-bracket"></i> Entrar</MyCourseButton>
					</MyCourse>
					<MyCourse>
						<MyCourseImage src="https://www.institutodeengenharia.org.br/site/wp-content/uploads/2018/02/Engenharia-Florestal.jpg"/>
						<MyCourseTitle>Engenharia Ambiental</MyCourseTitle>
						<MyCourseDesc>Curso de graduação de Engenharia Ambiental</MyCourseDesc>
						<MyCourseButton><i className="fa-solid fa-right-to-bracket"></i> Entrar</MyCourseButton>
					</MyCourse>
					<MyCourse>
						<MyCourseImage src="https://www.institutodeengenharia.org.br/site/wp-content/uploads/2018/02/Engenharia-Florestal.jpg"/>
						<MyCourseTitle>Engenharia Ambiental</MyCourseTitle>
						<MyCourseDesc>Curso de graduação de Engenharia Ambiental</MyCourseDesc>
						<MyCourseButton><i className="fa-solid fa-right-to-bracket"></i> Entrar</MyCourseButton>
					</MyCourse>
				</MyCourses>
				<Subtitle>Lista de cursos disponíveis:</Subtitle>
				<CoursesAvailable>
					<Course>
						<Icon className="fa-solid fa-graduation-cap"></Icon>
						<CourseID>Cód.: <b>E-01</b></CourseID>
						<CourseName>Engenharia de Produção</CourseName>
						<CourseStudents>
							<Icon className="fa-solid fa-user-graduate"></Icon>
							Alunos: <b>200</b>
						</CourseStudents>
						<Enroll>Matricular</Enroll>
					</Course>
					<Course>
						<Icon className="fa-solid fa-graduation-cap"></Icon>
						<CourseID>Cód.: <b>E-01</b></CourseID>
						<CourseName>Engenharia de Produção</CourseName>
						<CourseStudents>
							<Icon className="fa-solid fa-user-graduate"></Icon>
							Alunos: <b>200</b>
						</CourseStudents>
						<Enroll>Matricular</Enroll>
					</Course>
				</CoursesAvailable>
			</Main>
			<SidebarRight>
				<ProfileMenu avatar={user.avatar} name={user.name}/>
				<Tasks />
				<Grades />
			</SidebarRight>
		</Container>
		)
}

export default StudentCourses