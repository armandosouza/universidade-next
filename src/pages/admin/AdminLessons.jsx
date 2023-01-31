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
import TextArea from '../../components/admin/TextArea'
import Option from '../../components/admin/Option'
import SubmitCourse from '../../components/admin/SubmitCourse'
import Subtitle from '../../components/admin/Subtitle'
import Tab from '../../components/admin/Tab'
import Form from '../../components/admin/Form'

import Sidebar from '../../components/Sidebar'
import SidebarRight from '../../components/SidebarRight'
import Title from '../../components/Title'


const AdminLessons = () => {
	const {option} = useParams()
	const initialState = {type: option, msg: '', showMsg: false, statusMsg: '', title: '', description: '', img: '', video: '', typeLesson: '', courses: [], subjects: [], subjectCourse: '', subjectCurrent: '', lesson: '', lessons: []}
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
			userRequest.get(`${endpoints.lesson}/${state.subjectCourse}/${state.subjectCurrent}/${state.lesson}`)
			.then((response) => {
				dispatch({type: "SET_LESSON", payload: {title: response.data.title, description: response.data.description, img: response.data.image, typeLesson: response.data.type, video: response.data.video || ''}})
			})
		}
	}, [state.lesson])

	useEffect(() => {
		clearInputs(dispatch, ["title", "description", "subjectCourse", "subjectCurrent", "msg", "tag", "level", "img", "lesson", "typeLesson"])
	}, [state.type])

	const newLesson = (e) => {
		e.preventDefault()
		userRequest.post(`${endpoints.lesson}/new`, {
			title: state.title,
			description: state.description,
			img: state.img,
			courseId: state.subjectCourse,
			subjectId: state.subjectCurrent,
			typeLesson: state.typeLesson
		})
		.then((response) => {
			clearInputs(dispatch, ["title", "description", "subjectCourse", "subjectCurrent", "msg", "tag", "level", "img", "lesson", "typeLesson"])
			dispatch({type: "RESPONSE", payload: {msg: response.data.msg, statusMsg: 'success'}})
		}).catch((response) => {
			clearInputs(dispatch, ["title", "description", "subjectCourse", "subjectCurrent", "msg", "tag", "level", "img", "lesson", "typeLesson"])
			dispatch({type: "RESPONSE", payload: {msg: response.response.data.msg}})
		})
	}

	const removeLesson = (e) => {
		e.preventDefault()
		userRequest.delete(`${endpoints.lesson}/delete/${state.subjectCourse}/${state.subjectCurrent}/${state.lesson}`)
		.then((response) => {
			clearInputs(dispatch, ["title", "description", "subjectCourse", "subjectCurrent", "msg", "tag", "level", "img", "lesson", "typeLesson"])
			dispatch({type: "RESPONSE", payload: {msg: response.data.msg, statusMsg: 'success'}})
		})
		.catch((response) => {
			clearInputs(dispatch, ["title", "description", "subjectCourse", "subjectCurrent", "msg", "tag", "level", "img", "lesson", "typeLesson"])
			dispatch({type: "RESPONSE", payload: {msg: response.response.data.msg}})
		})
	}

	const editLesson = (e) => {
		e.preventDefault()
		userRequest.put(`${endpoints.lesson}/edit/${state.subjectCourse}/${state.subjectCurrent}/${state.lesson}`, {
			title: state.title,
			description: state.description,
			img: state.img,
			typeLesson: state.typeLesson
		})
		.then((response) => {
			clearInputs(dispatch, ["title", "description", "subjectCourse", "subjectCurrent", "msg", "tag", "level", "img", "lesson", "typeLesson"])
			dispatch({type: "RESPONSE", payload: {msg: response.data.msg, statusMsg: 'success'}})
		})
		.catch((response) => {
			clearInputs(dispatch, ["title", "description", "subjectCourse", "subjectCurrent", "msg", "tag", "level", "img", "lesson", "typeLesson"])
			dispatch({type: "RESPONSE", payload: {msg: response.response.data.msg}})
		})
	}

	return (
		<Container>
			<Sidebar location={user.url}/>
			<MainScroll id="main">
				<Title>Admin/Aulas</Title>
				<Tabs>
					<Tab onClick={() => handleTab(dispatch, 'novo')} className={state.type === 'novo' ? 'selected' : null}>Criar Aula</Tab>
					<Tab onClick={() => handleTab(dispatch, 'deletar')} className={state.type === 'deletar' ? 'selected' : null}>Remover Aula</Tab>
					<Tab onClick={() => handleTab(dispatch, 'editar')} className={state.type === 'editar' ? 'selected' : null}>Editar Aula</Tab>
				</Tabs>
				<Form>
					{state.type === 'novo' && 
						<>
							<Subtitle>Adicionar Aula</Subtitle>
							<Input onChange={(e) => dispatch({type: "SET_STATE", fieldName: "title", payload: e.target.value})} placeholder="Nome da Aula" required/>
							<TextArea onChange={(e) => dispatch({type: "SET_STATE", fieldName: "description", payload: e.target.value})} placeholder="Descrição da Aula" required></TextArea>
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
							<Select defaultValue="" onChange={(e) => dispatch({type: "SET_STATE", fieldName: "typeLesson", payload: e.target.value})} required>
								<Option value={""} disabled>Escolha o tipo de aula:</Option>
								<Option value={"lesson"}>Lição</Option>
								<Option value={"research"}>Pesquisa</Option>
								<Option value={"exam"}>Prova</Option>
								<Option value={"task"}>Tarefa</Option>
							</Select>
							<Input onChange={(e) => dispatch({type: "SET_STATE", fieldName: "img", payload: e.target.value})} placeholder="Thumbnail da Aula" required/>
							<Input onChange={(e) => dispatch({type: "SET_STATE", fieldName: "video", payload: e.target.value})} placeholder="Vídeo da Aula (opcional)"/>
							<Input onClick={(e) => newLesson(e)} style={{width: "40%", cursor: "pointer"}} type="submit" value="Adicionar Aula"/>
							{state.showMsg &&
								<SubmitCourse submit={state.statusMsg}>{state.msg}</SubmitCourse>
							}
						</>
					}
					{state.type === 'deletar' &&
						<>
							<Subtitle>Deletar Aula</Subtitle>
							<Select onChange={(e) => dispatch({type: "SET_STATE", fieldName: "subjectCourse", payload: e.target.value})} defaultValue={state.subjectCourse}>
								<Option value="" disabled>Escolha um curso:</Option>
								{state.courses.map(course => (
									<Option value={course._id} key={course._id}>{course.name}</Option>
								))}
							</Select>
							{state.subjectCourse &&
								<Select defaultValue={state.subjectCurrent} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "subjectCurrent", payload: e.target.value})} required>
									<Option value="" disabled>Escolha uma disciplina:</Option>
									{state.subjects.map(subject => (
										<Option value={subject._id} key={subject._id}>{subject.name}</Option>
									))}
								</Select>
							}
							{state.subjectCurrent &&
								<Select defaultValue={state.lesson} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "lesson", payload: e.target.value})} required>
									<Option value="" disabled>Escolha uma aula:</Option>
									{state.lessons.map(lesson => (
										<Option value={lesson._id} key={lesson._id}>{lesson.title}</Option>
									))}
								</Select>
							}
							<Input onClick={(e) => removeLesson(e)} style={{width: "40%", backgroundColor: "#d32f2f", color: "whitesmoke", cursor: "pointer"}} type="submit" value="Deletar"/>
							{state.showMsg &&
								<SubmitCourse submit={state.statusMsg}>{state.msg}</SubmitCourse>
							}
						</>
					}
					{state.type === 'editar' &&
						<>
							<Subtitle>Editar Aula</Subtitle>
							<Select onChange={(e) => dispatch({type: "SET_STATE", fieldName: "subjectCourse", payload: e.target.value})} defaultValue={state.subjectCourse}>
								<Option value="" disabled>Escolha um curso:</Option>
								{state.courses.map(course => (
									<Option value={course._id} key={course._id}>{course.name}</Option>
								))}
							</Select>
							{state.subjectCourse &&
								<Select defaultValue={state.subjectCurrent} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "subjectCurrent", payload: e.target.value})} required>
									<Option value="" disabled>Escolha uma disciplina:</Option>
									{state.subjects.map(subject => (
										<Option value={subject._id} key={subject._id}>{subject.name}</Option>
									))}
								</Select>
							}
							{state.subjectCurrent &&
								<Select defaultValue={state.lesson} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "lesson", payload: e.target.value})} required>
									<Option value="" disabled>Escolha uma aula:</Option>
									{state.lessons.map(lesson => (
										<Option value={lesson._id} key={lesson._id}>{lesson.title}</Option>
									))}
								</Select>
							}
							{state.lesson &&
								<>
									<Input defaultValue={state.title} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "title", payload: e.target.value})} placeholder="Nome da Aula" required/>
									<TextArea defaultValue={state.description} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "description", payload: e.target.value})} placeholder="Descrição da Aula" required></TextArea>
									<Select value={state.typeLesson} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "typeLesson", payload: e.target.value})} required>
										<Option value={""} disabled>Escolha o tipo de aula:</Option>
										<Option value={"lesson"}>Lição</Option>
										<Option value={"research"}>Pesquisa</Option>
										<Option value={"exam"}>Prova</Option>
										<Option value={"task"}>Tarefa</Option>
									</Select>
									<Input defaultValue={state.img} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "img", payload: e.target.value})} placeholder="Thumbnail da Aula" required/>
									<Input defaultValue={state.video} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "video", payload: e.target.value})} placeholder="Vídeo da Aula (opcional)"/>
								</>
							}
							<Input onClick={(e) => editLesson(e)} style={{width: "40%", cursor: "pointer"}} type="submit" value="Editar Aula"/>
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

export default AdminLessons