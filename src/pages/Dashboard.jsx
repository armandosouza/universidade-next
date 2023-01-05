import styled from 'styled-components'
import axios from 'axios'

import {useEffect, useState} from 'react'
import {useParams, useNavigate, useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {saveUser} from '../redux/features/userSlice'

import Sidebar from '../components/Sidebar'
import ProfileMenu from '../components/ProfileMenu'
import Tasks from '../components/Tasks'
import Grades from '../components/Grades'

const Container = styled.div`
	width: 100%;
	height: 100%;
	background: white;
	display: flex;
	position: relative;
`

const Main = styled.div`
	width: 65%;
	height: 100%;

	&.expand {
		width: 75%;
	}
`

const Title = styled.h2`
	font-size: 36px;
	margin: 10px;
`

const Hr = styled.hr``
const Courses = styled.div`
	display: flex;
	margin: 10px;
	flex-wrap: wrap;
	justify-content: space-around;
`

const Course = styled.div`
	position: relative;
	width: 320px;
	height: 280px;
	margin: 10px;
	box-shadow: 1px 2px 4px gray;
	cursor: pointer;
	color: #4286f4;
	transition: .5s;

	&:hover {
		transform: scale(1.03);
	}
`

const CourseImage = styled.div`
	width: 100%;
	height: 60%;
	background: url(${props => props.bg});
	background-size: cover;
	background-position: center;
`

const CourseName = styled.h3`
	margin-top: 5px;
	margin-left: 10px;
`

const CourseMenu = styled.div`
	position: absolute;
	bottom: 0;
	display: flex;
	width: 100%;
`

const CourseMenuItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10px 0;
	width: 25%;
	transition: .5s;

	&:hover {
		color: aquamarine;
	}
`

const CourseMenuIcon = styled.i`
	text-shadow: 1px 2px 4px lightgray;
	font-size: 18px;
`

const Progress = styled.p`
	margin-top: 10px;
	margin-left: 15px;
	text-transform: uppercase;
	font-weight: bold;
	font-size: 14px;
`

const Tag = styled.span`
	width: 80px;
	height: 20px;
	padding: 0 5px;
	border-radius: 9px;
	background-color: #281e5d;
	color: whitesmoke;
	font-weight: bold;
	font-size: 12px;
	text-align: center;
	text-transform: uppercase;
	overflow: hidden;
	position: absolute;
	bottom: 30%;
	right: 10px;
`

const SidebarRight = styled.aside`
	width: 15%;
	background-color: #7f7d9c;
`

const Dashboard = () => {
	const [name, setName] = useState('')
	const [avatar, setAvatar] = useState('')
	const [courses, setCourses] = useState([])

	const {id} = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const location = useLocation()

	useEffect(() => {
		const requestUser = axios.create({
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		requestUser.get(`http://localhost:3001/api/user/${id}`)
		.then((response) => {
			let user = response.data.user
			setName(user.name)
			setAvatar(user.avatar)
			setCourses(user.courses)

			dispatch(saveUser({
				id: user._id,
				name: user.name,
				email: user.email,
				birth: user.birth,
				avatar: user.avatar,
				profileImg: user.profileImg,
				achievements: user.achievements,
				courses: user.courses,
				url: location.pathname,
				status: user.status
			}))
		}).catch((e) => {
			navigate('/login')
		})
	}, [])

	return (
		<Container>
			<Sidebar location={location.pathname}/>
			<Main id="main">
				<Title>Dashboard</Title>
				<Hr/>
				<Courses>
					{courses.length > 0
						? courses.map((course) => (
							<Course>
								<CourseImage bg="https://www.institutodeengenharia.org.br/site/wp-content/uploads/2018/02/Engenharia-Florestal.jpg"/>
								<CourseName>Cálculo 1</CourseName>
								<Progress>25% Concluídos</Progress>
								<Tag>Engenharia de Produção</Tag>
								<CourseMenu>
									<CourseMenuItem>
										<CourseMenuIcon className="fa-solid fa-bell"></CourseMenuIcon>
									</CourseMenuItem>
									<CourseMenuItem>
										<CourseMenuIcon className="fa-solid fa-folder"></CourseMenuIcon>
									</CourseMenuItem>
									<CourseMenuItem>
										<CourseMenuIcon className="fas fa-sticky-note"></CourseMenuIcon>
									</CourseMenuItem>
									<CourseMenuItem>
										<CourseMenuIcon className="fa-solid fa-info-circle"></CourseMenuIcon>
									</CourseMenuItem>
								</CourseMenu>
							</Course>
						))
						:
						"Sem cursos em andamento!"
					}
				</Courses>
			</Main>
			<SidebarRight>
				<ProfileMenu avatar={avatar} name={name}/>
				<Tasks />
				<Grades />
			</SidebarRight>
		</Container>
		)
}

export default Dashboard