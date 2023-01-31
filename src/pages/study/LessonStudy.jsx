import styled from 'styled-components'
import request, {endpoints} from '../../request'
import loadingGif from '../../assets/loading.gif'

import {useSelector} from 'react-redux'
import {useParams, useLocation, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'

import SidebarStudy from '../../components/study/SidebarStudy'
import Title from '../../components/Title'

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	position: relative;
`

const Main = styled.div`
	width: 80%;
	height: 100vh;
	position: relative;

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

const Description = styled.p`
	font-size: 22px;
	text-align: center;
	margin: 10px 20px;
	line-height: 35px;
`

const Subtitle = styled.h3`
	text-decoration: underline;
	margin-left: 20px;
	font-size: 20px;
`

const Lessons = styled.div`
	margin: 20px;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
`

const Lesson = styled.div`
	width: 240px;
	height: 270px;
	border-radius: 12px;
	box-shadow: 2px 3px 7px black;
	transition: .5s;
	cursor: pointer;
	margin: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;

	&:hover {
		transform: scale(1.05);
	}
`

const LessonImg = styled.div`
	background: url(${props => props.bg});
	border-radius: 12px 12px 0 0;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	height: 70%;
	width: 100%;
`

const LessonName = styled.h4`
	text-align: center;
	text-decoration: underline;
	margin-top: 15px;
	color: #3e3d53;
	font-size: 18px;
`

const LessonStatus = styled.span`
	text-align: center;
	font-size: 14px;
	color: green;
	position: absolute;
	bottom: 15px;
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

const LessonStudy = () => {
	const {courseId, subjectId} = useParams()
	const [lessons, setLessons] = useState([])
	const [loading, setLoading] = useState(true)
	const user = useSelector(state => state.user[0])
	const url = useLocation()
	const navigate = useNavigate()
	const userRequest = request()

	useEffect(() => {
		userRequest.get(`${endpoints.lesson}/${courseId}/${subjectId}`)
		.then((response) => {
			setLessons([...response.data])
			setLoading(false)
		})
	}, [])

	useEffect(() => {
		let verifyStudentLessons = false
		lessons.forEach((lesson) => {
			const filter = lesson.lessonStatus.filter((status) => status.email === user.email && status.status)
			if(filter.length > 0) {
				verifyStudentLessons = true
			}
		})
		if(verifyStudentLessons) {
			userRequest.post(`${endpoints.subject}/${courseId}/${subjectId}`, {
				userId: user.id
			})
		}
	}, [lessons])

	return (
		<Container>
			<SidebarStudy subjects={lessons}/>
			<Main>
				<Title>Aulas</Title>
				<Description>Veja a lista de aulas disponíveis abaixo:</Description>
				<Subtitle>Lições:</Subtitle>
				<Lessons>
					{loading &&
						<LoadingContainer>
							<Loading src={loadingGif}/>
						</LoadingContainer>
					}
					{lessons.length > 0 ?
						lessons.map((lesson) => (
							<Lesson key={lesson._id} onClick={() => navigate(`${url.pathname}/${lesson._id}`)}>
								<LessonImg bg={lesson.image}/>
								<LessonName>{lesson.title}</LessonName>
								{lesson.lessonStatus.map((status, index) => (
									status.email === user.email && status.status &&
										<LessonStatus key={index}><i className="fa-solid fa-check"></i> Concluído</LessonStatus>
								))}
							</Lesson>
						))
						:
						<p style={{textAlign: "center", marginTop: "10px", fontSize: "20px"}}>Não há aulas nessa disciplina!</p>
					}
				</Lessons>
			</Main>
		</Container>
	)
}

export default LessonStudy