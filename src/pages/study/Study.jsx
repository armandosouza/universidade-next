import styled from 'styled-components'
import request, {endpoints} from '../../request'
import loadingGif from '../../assets/loading.gif'

import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
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
	display: flex;
	flex-direction: column;
	align-items: center;
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
	white-space: pre-wrap;
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

const Image = styled.img`
	width: 50%;
	height: 50%;
	object-fit: cover;
	text-align: center;
	margin: 20px 25%;
`

const Lesson = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`

const Video = styled.iframe`
	margin: 0 auto;
`

const TextArea = styled.textarea`
	outline: none;
	margin: 10px 0;
	font-family: 'Didact Gothic', sans-serif;
	font-size: 20px;
	height: 200px;
	width: 70%;
	border-radius: 9px;
	border: 1px solid #e6e2e1;
	resize: none;
	text-align: center;
`

const Question = styled.div`
	margin: 10px 0;
	width: 100%;
`

const Icon = styled.i``

const QuestionTitle = styled.h4`
	font-size: 18px;
	text-align: center;
`

const QuestionOptions = styled.form`
	margin: 10px auto;
	font-family: 'Didact Gothic', sans-serif;
	font-size: 20px;
	width: 70%;
	border-radius: 9px;
	border: 1px solid #e6e2e1;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 10px 0;

`

const QuestionOptionContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 5px 0;
`

const QuestionOption = styled.input`
	text-align: center;
`

const Label = styled.label`
	margin-left: 5px;
`

const Button = styled.span`
	padding: 10px 0px;
	width: 40%;
	background-color: #006994;
	color: lightblue;
	font-size: 22px;
	border-radius: 9px;
	cursor: pointer;
	text-align: center;
	margin: 0 auto;

	&:hover {
		background-color: lightblue;
		color: #006994;
	}
`

const Message = styled.span`
	bottom: 50%;
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


const Study = () => {
	const {courseId, subjectId, lessonId} = useParams()
	const [lesson, setLesson] = useState([])
	const [loading, setLoading] = useState(true)
	const [answer, setAnswer] = useState('')
	const [options, setOptions] = useState([])
	const [msg, setMsg] = useState('')
	const [submit, setSubmit] = useState(true)
	const user = useSelector(state => state.user[0])
	const userRequest = request()

	const handleScroll = (e) => {
		if(submit && lesson[0].type === 'lesson') {
			const target = e.target
			if(target.scrollHeight - target.scrollTop === target.clientHeight) {
				userRequest.post(`${endpoints.lesson}/${user.id}/${courseId}/${subjectId}/${lessonId}`)
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
		}
	}

	const handleOption = (questionId, optionIndex) => {
		const option = options.findIndex((option) => option.questionId === questionId)
		if(option === -1) {
			setOptions([...options, {
				questionId: questionId,
				option: optionIndex
			}])
		} else {
			const newOptions = options.filter((option) => option.questionId !== questionId)
			setOptions([...newOptions, {
				questionId: questionId,
				option: optionIndex
			}])
		}
	}

	const submitLesson = () => {
		userRequest.post(`${endpoints.lesson}/${user.id}/${courseId}/${subjectId}/${lessonId}`, {
			options,
			answer
		}).then((response) => {
			setMsg(response.data.msg)
			setTimeout(() => {
				setMsg('')
			}, 3000)
		}).catch((response) => {
			setMsg(response.response.data.msg)
			setTimeout(() => {
				setMsg('')
			}, 3000)
		})
	}

	useEffect(() => {
		userRequest.get(`${endpoints.lesson}/${courseId}/${subjectId}/${lessonId}`)
		.then((response) => {
			const student = response.data.lessonStatus.find((student) => student.email === user.email)
			if(student) {
				setSubmit(false)
			}
			setLesson([response.data])
			setLoading(false)
		})
	}, [])

	return (
		<Container>
			<SidebarStudy subjects={lesson}/>
			<Main onScroll={(e) => handleScroll(e)}>
				{loading &&
					<LoadingContainer>
						<Loading src={loadingGif}/>
					</LoadingContainer>
				}
				{lesson.length > 0 &&
					lesson.map(lesson => (
						<Lesson key={lesson._id}>
							<Title>{lesson.title}</Title>
							<Image src={lesson.image} />
							<Description>{lesson.description}</Description>
							{lesson.video && 
								<Video width="400" height="320" src={lesson.video}></Video>
							}
							{lesson.answer &&
								<TextArea onChange={(e) => setAnswer(e.target.value)} placeholder={lesson.answer || answer}></TextArea>
							}
							{lesson.questions.length > 0 &&
								lesson.questions.map((question, index) => (
									<Question key={question._id}>
										<QuestionTitle><Icon className="fa-solid fa-circle-question"></Icon> {`${index+1}) ${question.title}`}</QuestionTitle>
										<QuestionOptions onChange={(e) => handleOption(question._id, e.target.id)}>
										{question.options.map((option, index) => (
											<QuestionOptionContainer key={index}>
												<QuestionOption name={question._id} type="radio" id={index} />
												<Label htmlFor={index}>{option.option}</Label>
											</QuestionOptionContainer>
										))
										}
										</QuestionOptions>
									</Question>
								))
							}
							{(lesson.answer || lesson.questions.length > 0) &&
								<Button onClick={submitLesson}>Enviar</Button>
							}
						</Lesson>
					))
				}
				{msg &&
					<Message>{msg}</Message>
				}
			</Main>
		</Container>
	)
}

export default Study