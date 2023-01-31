import request, {endpoints} from '../../request'
import reducer from '../../reducer'
import {clearInputs, handleTab} from '../../helpers/helpers'

import {useReducer, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'

import MainScroll from '../../components/admin/MainScroll'
import Container from '../../components/admin/Container'
import Tabs from '../../components/admin/Tabs'
import Select from '../../components/admin/Select'
import Input from '../../components/admin/Input'
import Option from '../../components/admin/Option'
import SubmitCourse from '../../components/admin/SubmitCourse'
import Subtitle from '../../components/admin/Subtitle'
import Tab from '../../components/admin/Tab'
import Form from '../../components/admin/Form'

import Sidebar from '../../components/Sidebar'
import SidebarRight from '../../components/SidebarRight'
import Title from '../../components/Title'


const AdminQuestions = () => {
	const {option} = useParams()
	const initialState = {type: option, msg: "", statusMsg: "", showMsg: false, title: "", courses: [], subjects: [], subjectCourse: "", subjectCurrent: "", lesson: "", lessons: [], questions: [], question: "", optionA: "", optionB: "", optionC: "", optionD: "", correctAnswer: ""}
	const [state, dispatch] = useReducer(reducer, initialState)
	const userRequest = request()
	const user = useSelector(state => state.user[0])

	useEffect(() => {
		userRequest.get(`${endpoints.course}`)
		.then((response) => {
			dispatch({type: "SET_COURSES", payload: [...response.data]})
		})
		.catch((response) => {
			dispatch({type: "RESPONSE", payload: {msg: response.response.data.msg, statusMsg: ''}})
		})
	}, [])

	useEffect(() => {
		if(state.subjectCourse) {
			const course = state.courses.filter((course) => course._id === state.subjectCourse)
			dispatch({type: "SET_SUBJECTS", payload: course[0].subjects})
		}
	}, [state.subjectCourse])

	useEffect(() => {
		if(state.subjectCurrent) {
			const subject = state.subjects.filter((subject) => subject._id === state.subjectCurrent)
			dispatch({type: "SET_LESSONS", payload: subject[0].lessons})
		}
	}, [state.subjectCurrent])

	useEffect(() => {
		if(state.lesson) {
			const lessonFilter = state.lessons.filter((lessonFilter) => lessonFilter._id === state.lesson)
			dispatch({type: "SET_QUESTIONS", payload: lessonFilter[0].questions})
		}
	}, [state.lesson])

	useEffect(() => {
		if(state.question) {
			userRequest.get(`${endpoints.question}/${state.subjectCourse}/${state.subjectCurrent}/${state.lesson}/${state.question}`)
			.then((response) => {
				dispatch({type: "SET_QUESTION", payload: {title: response.data.title, optionA: response.data.options[0].option, optionB: response.data.options[1].option, optionC: response.data.options[2].option, optionD: response.data.options[3].option}})
			})
		}
	}, [state.question])

	useEffect(() => {
		clearInputs(dispatch, ["title", "msg", "subjectCourse", "subjectCurrent", "lesson", "correctAnswer", "optionA", "optionB", "optionC", "optionD"])
	}, [state.type])

	const handleCorrectAnswer = (option) => {
		dispatch({type: "SET_STATE", fieldName: "correctAnswer", payload: option})
	}

	const newQuestion = (e) => {
		e.preventDefault()
		const options = [state.optionA, state.optionB, state.optionC, state.optionD]
		userRequest.post(`${endpoints.course}/new`, {
			title: state.title,
			courseId: state.subjectCourse,
			subjectId: state.subjectCurrent,
			lessonId: state.lesson,
			correctAnswer: state.correctAnswer,
			options
		})
		.then((response) => {
			dispatch({type: "RESPONSE", payload: {msg: response.data.msg, statusMsg: 'success'}})
		}).catch((response) => {
			dispatch({type: "RESPONSE", payload: {msg: response.response.data.msg, statusMsg: ''}})
		})
	}

	const removeQuestion = (e) => {
		e.preventDefault()
		userRequest.delete(`${endpoints.question}/delete/${state.subjectCourse}/${state.subjectCurrent}/${state.lesson}/${state.question}`)
		.then((response) => {
			dispatch({type: "RESPONSE", payload: {msg: response.data.msg, statusMsg: 'success'}})
		}).catch((response) => {
			dispatch({type: "RESPONSE", payload: {msg: response.response.data.msg, statusMsg: ''}})
		})
	}

	const editQuestion = (e) => {
		e.preventDefault()
		const options = [state.optionA, state.optionB, state.optionC, state.optionD]
		userRequest.put(`${endpoints.question}/edit`, {
			title: state.title,
			courseId: state.subjectCourse,
			subjectId: state.subjectCurrent,
			lessonId: state.lesson,
			questionId: state.question,
			correctAnswer: state.correctAnswer,
			options
		})
		.then((response) => {
			dispatch({type: "RESPONSE", payload: {msg: response.data.msg, statusMsg: 'success'}})
		}).catch((response) => {
			dispatch({type: "RESPONSE", payload: {msg: response.response.data.msg, statusMsg: ''}})
		})
	}

	return (
		<Container>
			<Sidebar location={user.url}/>
			<MainScroll id="main">
				<Title>Admin/Questões</Title>
				<Tabs>
					<Tab onClick={() => handleTab(dispatch, 'novo')} className={state.type === 'novo' ? 'selected' : null}>Criar Questão</Tab>
					<Tab onClick={() => handleTab(dispatch, 'deletar')} className={state.type === 'deletar' ? 'selected' : null}>Remover Questão</Tab>
					<Tab onClick={() => handleTab(dispatch, 'editar')} className={state.type === 'editar' ? 'selected' : null}>Editar Questão</Tab>
				</Tabs>
				<Form>
					{state.type === 'novo' && 
						<>
							<Subtitle>Adicionar Questão</Subtitle>
							<Select defaultValue="" onChange={(e) => dispatch({type: "SET_STATE", fieldName: "subjectCourse", payload: e.target.value})} required>
								<Option value="" disabled>Escolha um curso:</Option>
								{state.courses.map(course => (
									<Option value={course._id} key={course._id}>{course.name}</Option>
								))}
							</Select>
							{state.subjectCourse &&
								<Select defaultValue="" onChange={(e) => dispatch({type: "SET_STATE", fieldName: "subjectCurrent", payload: e.target.value})} required>
									<Option value="" disabled>Escolha uma disciplina:</Option>
									{state.subjects.map(subject => (
										<Option value={subject._id} key={subject._id}>{subject.name}</Option>
									))}
								</Select>
							}
							{state.subjectCurrent &&
								<Select defaultValue="" onChange={(e) => dispatch({type: "SET_STATE", fieldName: "lesson", payload: e.target.value})} required>
									<Option value="" disabled>Escolha uma aula:</Option>
									{state.lessons.map(lesson => (
										<Option value={lesson._id} key={lesson._id}>{lesson.title}</Option>
									))}
								</Select>
							}
							<Input onChange={(e) => dispatch({type: "SET_STATE", fieldName: "title", payload: e.target.value})} placeholder="Título da Questão" required/>
							<Input onClick={() => handleCorrectAnswer('0')} status={state.correctAnswer === '0' ? 'correct' : null} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "optionA", payload: e.target.value})} placeholder="Alternativa A" required/>
							<Input onClick={() => handleCorrectAnswer('1')} status={state.correctAnswer === '1' ? 'correct' : null} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "optionB", payload: e.target.value})} placeholder="Alternativa B" required/>
							<Input onClick={() => handleCorrectAnswer('2')} status={state.correctAnswer === '2' ? 'correct' : null} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "optionC", payload: e.target.value})} placeholder="Alternativa C" required/>
							<Input onClick={() => handleCorrectAnswer('3')} status={state.correctAnswer === '3' ? 'correct' : null} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "optionD", payload: e.target.value})} placeholder="Alternativa D" required/>
							<Input onClick={(e) => newQuestion(e)} style={{width: "40%", cursor: "pointer"}} type="submit" value="Adicionar Questão"/>
							{state.showMsg &&
								<SubmitCourse submit={state.statusMsg}>{state.msg}</SubmitCourse>
							}
						</>
					}
					{state.type === 'deletar' && 
						<>
							<Subtitle>Remover Questão</Subtitle>
							<Select defaultValue="" onChange={(e) => dispatch({type: "SET_STATE", fieldName: "subjectCourse", payload: e.target.value})} required>
								<Option value="" disabled>Escolha um curso:</Option>
								{state.courses.map(course => (
									<Option value={course._id} key={course._id}>{course.name}</Option>
								))}
							</Select>
							{state.subjectCourse &&
								<Select defaultValue="" onChange={(e) => dispatch({type: "SET_STATE", fieldName: "subjectCurrent", payload: e.target.value})} required>
									<Option value="" disabled>Escolha uma disciplina:</Option>
									{state.subjects.map(subject => (
										<Option value={subject._id} key={subject._id}>{subject.name}</Option>
									))}
								</Select>
							}
							{state.subjectCurrent &&
								<Select defaultValue="" onChange={(e) => dispatch({type: "SET_STATE", fieldName: "lesson", payload: e.target.value})} required>
									<Option value="" disabled>Escolha uma aula:</Option>
									{state.lessons.map(lesson => (
										<Option value={lesson._id} key={lesson._id}>{lesson.title}</Option>
									))}
								</Select>
							}
							{state.lesson &&
								<Select defaultValue="" onChange={(e) => dispatch({type: "SET_STATE", fieldName: "question", payload: e.target.value})} required>
									<Option value="" disabled>Escolha uma questão:</Option>
									{state.questions.map(question => (
										<Option value={question._id} key={question._id}>{question.title}</Option>
									))}
								</Select>
							}
							<Input onClick={(e) => removeQuestion(e)} style={{width: "40%", cursor: "pointer", color: "white", backgroundColor: "#d32f2f"}} type="submit" value="Remover Questão"/>
							{state.showMsg &&
								<SubmitCourse submit={state.statusMsg}>{state.msg}</SubmitCourse>
							}
						</>
					}
					{state.type === 'editar' && 
						<>
							<Subtitle>Editar Questão</Subtitle>
							<Select defaultValue="" onChange={(e) => dispatch({type: "SET_STATE", fieldName: "subjectCourse", payload: e.target.value})} required>
								<Option value="" disabled>Escolha um curso:</Option>
								{state.courses.map(course => (
									<Option value={course._id} key={course._id}>{course.name}</Option>
								))}
							</Select>
							{state.subjectCourse &&
								<Select defaultValue="" onChange={(e) => dispatch({type: "SET_STATE", fieldName: "subjectCurrent", payload: e.target.value})} required>
									<Option value="" disabled>Escolha uma disciplina:</Option>
									{state.subjects.map(subject => (
										<Option value={subject._id} key={subject._id}>{subject.name}</Option>
									))}
								</Select>
							}
							{state.subjectCurrent &&
								<Select defaultValue="" onChange={(e) => dispatch({type: "SET_STATE", fieldName: "lesson", payload: e.target.value})} required>
									<Option value="" disabled>Escolha uma aula:</Option>
									{state.lessons.map(lesson => (
										<Option value={lesson._id} key={lesson._id}>{lesson.title}</Option>
									))}
								</Select>
							}
							{state.lesson &&
								<Select defaultValue="" onChange={(e) => dispatch({type: "SET_STATE", fieldName: "question", payload: e.target.value})} required>
									<Option value="" disabled>Escolha uma questão:</Option>
									{state.questions.map(question => (
										<Option value={question._id} key={question._id}>{question.title}</Option>
									))}
								</Select>
							}
							<Input defaultValue={state.title} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "title", payload: e.target.value})} placeholder="Título da Questão" required/>
							<Input defaultValue={state.optionA} onClick={() => handleCorrectAnswer('0')} status={state.correctAnswer === '0' ? 'correct' : null} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "optionA", payload: e.target.value})} placeholder="Alternativa A" required/>
							<Input defaultValue={state.optionB} onClick={() => handleCorrectAnswer('1')} status={state.correctAnswer === '1' ? 'correct' : null} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "optionB", payload: e.target.value})} placeholder="Alternativa B" required/>
							<Input defaultValue={state.optionC} onClick={() => handleCorrectAnswer('2')} status={state.correctAnswer === '2' ? 'correct' : null} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "optionC", payload: e.target.value})} placeholder="Alternativa C" required/>
							<Input defaultValue={state.optionD} onClick={() => handleCorrectAnswer('3')} status={state.correctAnswer === '3' ? 'correct' : null} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "optionD", payload: e.target.value})} placeholder="Alternativa D" required/>
							<Input onClick={(e) => editQuestion(e)} style={{width: "40%", cursor: "pointer"}} type="submit" value="Editar Questão"/>
							{state.showMsg &&
								<SubmitCourse submit={state.statusMsg}>{state.msg}</SubmitCourse>
							}
						</>
					}
				</Form>
			</MainScroll>
			<SidebarRight avatar={user.avatar} name={user.name}/>
		</Container>
		)
}

export default AdminQuestions