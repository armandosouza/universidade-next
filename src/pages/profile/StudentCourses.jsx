import styled from 'styled-components'
import request, {endpoints} from '../../request'
import loadingGif from '../../assets/loading.gif'

import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import Sidebar from '../../components/Sidebar'
import SidebarRight from '../../components/SidebarRight'
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
	overflow-y: hidden;
	position: relative;
`

const MyCourses = styled.div`
	padding-top: 5px;
	padding-bottom: 20px;
	width: 100%;
	height: 50vh;
	display: flex;
	overflow-x: scroll;
	overflow-y: hidden;

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
	width: 240px;
	height: 280px;
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
	border: 1px solid #006994;

	&:hover {
		background-color: #006994;
		color: whitesmoke;
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
	height: 40vh;
	overflow-y: scroll;

	::-webkit-scrollbar {
		width: 10px;
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

const Message = styled.span`
	position: absolute;
	bottom: 15px;
	left: 25%;
	font-weight: bold;
	background-color: lightgray;
	color: #3e3d53;
	padding: 5px 0px;
	width: 50%;
	border-radius: 9px;
	border: 1px solid #3e3d53;
	text-align: center;
	transition: .5s;
`

const LoadingContainer = styled.div`	
	width: 40%;
	height: 40%;
	background-color: whitesmoke;
	box-shadow: 1px 2px 4px black;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	left: 30%;
	top: 30%;
`

const Loading = styled.img`
	max-width: 150px;
	max-height: 150px;
`

const StudentCourses = () => {
	const navigate = useNavigate()
	const user = useSelector(state => state.user[0])
	const [courses, setCourses] = useState([])
	const [coursesEnrolled, setCoursesEnrolled] = useState([])
	const [loading, setLoading] = useState(true)
	const [msg, setMsg] = useState('')
	const userRequest = request()

	useEffect(() => {
		if(!user) {
			return navigate('/login')
		}

		document.title = `${user.name} | Cursos`
		userRequest.get(`${endpoints.course}/user/${user.id}`)
		.then((response) => {
			setLoading(false)
			setCoursesEnrolled([...response.data.coursesEnrolled])
			setCourses([...response.data.coursesNotEnrolled])
		})
	}, [])

	const enrollCourse = (id) => {
		userRequest.post(`${endpoints.course}/enroll/${id}/${user.id}`)
		.then((response) => {
			setMsg(response.data.msg)
			setTimeout(() => {
				setMsg('')
			}, 3000)
		})
		.catch((response) => {
			setMsg(response.response.data.msg)
			setTimeout(() => {
				setMsg('')
			}, 3000)
		})
	}

	return (
		<Container>
			<Sidebar location={user.url}/>
			<Main id="main">
				<Title>Cursos</Title>
				<Subtitle>Meus Cursos</Subtitle>
				{loading &&
					<LoadingContainer>
						<Loading src={loadingGif}/>
					</LoadingContainer>
				}
				{coursesEnrolled.length > 0 ?
					coursesEnrolled.map((course) => (
						<MyCourses key={course._id}>
							<MyCourse>
								<MyCourseImage src={course.img}/>
								<MyCourseTitle>{course.name}</MyCourseTitle>
								<MyCourseDesc>{`${course.description.substring(0,60)}...`}</MyCourseDesc>
								<MyCourseButton onClick={() => navigate(`/study/${user.id}/${course._id}/${course.name.replace(/\s/g, '-').toLowerCase()}`)}><i className="fa-solid fa-right-to-bracket"></i> Entrar</MyCourseButton>
							</MyCourse>
						</MyCourses>
					))
					:
					<p style={{padding: "10px 0px", textAlign: "center"}}>Você não se matriculou em nenhum curso!</p>
				}
				<Subtitle>Lista de cursos disponíveis:</Subtitle>
				<CoursesAvailable>
				{courses.length > 0 ?
					courses.map((course) => (
						<Course key={course._id}>
							<Icon className="fa-solid fa-graduation-cap"></Icon>
							<CourseID>Cód.: <b>{course._id.substring(0,3)}</b></CourseID>
							<CourseName>{course.name}</CourseName>
							<CourseStudents>
								<Icon className="fa-solid fa-user-graduate"></Icon>
								Alunos: <b>{course.students.length}</b>
							</CourseStudents>
							<Enroll onClick={() => enrollCourse(course._id)}>Matricular</Enroll>
						</Course>
					))
					:
					<p style={{padding: "10px 0px", textAlign: "center"}}>Não há cursos disponíveis para você!</p>
				}
				</CoursesAvailable>
				{msg &&
					<Message>{msg}</Message>
				}
			</Main>
			<SidebarRight avatar={user.avatar} name={user.name} admin={user.admin}/>
		</Container>
		)
}

export default StudentCourses
