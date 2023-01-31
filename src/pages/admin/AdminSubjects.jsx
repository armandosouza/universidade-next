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
import TextArea from '../../components/admin/TextArea'
import Form from '../../components/admin/Form'

import Sidebar from '../../components/Sidebar'
import SidebarRight from '../../components/SidebarRight'
import Title from '../../components/Title'


const AdminSubjects = () => {
	const {option} = useParams()
	const initialState = {type: option, msg: "", statusMsg: "", showMsg: false, name: "", description: "", semester: "", img: "", courses: [], subjectCourse: "", subjects: [], semesterSelected: 0, selectedSubjects: [], subjectId: ""}
	const [state, dispatch] = useReducer(reducer, initialState)
	const user = useSelector(state => state.user[0])
	const userRequest = request()

	useEffect(() => {
		userRequest.get(`${endpoints.course}`)
		.then((response) => {
			dispatch({type: "SET_COURSES", payload: [...response.data]})
		}).catch((response) => {
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
		if(state.semesterSelected) {
			const listSubjects = state.subjects
			const subjectsFiltered = []
			for(let i in listSubjects) {
				if(parseInt(listSubjects[i].semester) === parseInt(state.semesterSelected)) {
					subjectsFiltered.push(listSubjects[i])
				}
			}
			dispatch({type: "SET_STATE", fieldName: "selectedSubjects", payload: subjectsFiltered})
		}
	}, [state.semesterSelected])

	useEffect(() => {
		if(state.subjectCourse && state.subjectId) {
			userRequest.get(`${endpoints.subject}/${state.subjectCourse}/${state.subjectId}`)
			.then((response) => {
				dispatch({type: "SET_SUBJECT", payload: {name: response.data.name, semester: response.data.semester, img: response.data.img, description: response.data.description}})
			})
		}
	}, [state.subjectId])

	useEffect(() => {
		clearInputs(dispatch, ["name", "description", "img", "semester", "msg", "subjectCourse", "subjectId"])
	}, [state.type])

	const newSubject = (e) => {
		e.preventDefault()
		userRequest.post(`${endpoints.subject}/new`, {
			name: state.name,
			img: state.img,
			description: state.description,
			semester: state.semester,
			courseId: state.subjectCourse
		})
		.then((response) => {
			clearInputs(dispatch, ["name", "description", "img", "semester", "msg", "subjectCourse", "subjectId"])
			dispatch({type: "RESPONSE", payload: {msg: response.data.msg, statusMsg: 'success'}})
		})
		.catch((response) => {
			clearInputs(dispatch, ["name", "description", "img", "semester", "msg", "subjectCourse", "subjectId"])
			dispatch({type: "RESPONSE", payload: {msg: response.response.data.msg, statusMsg: ''}})
		})
	}

	const removeSubject = (e) => {
		e.preventDefault()
		userRequest.delete(`${endpoints.subject}/delete/${state.subjectCourse}/${state.subjectId}`)
		.then((response) => {
			clearInputs(dispatch, ["name", "description", "img", "semester", "msg", "subjectCourse", "subjectId"])
			dispatch({type: "RESPONSE", payload: {msg: response.data.msg, statusMsg: 'success'}})
		})
		.catch((response) => {
			clearInputs(dispatch, ["name", "description", "img", "semester", "msg", "subjectCourse", "subjectId"])
			dispatch({type: "RESPONSE", payload: {msg: response.response.data.msg, statusMsg: ''}})
		})
	}

	const editSubject = (e) => {
		e.preventDefault()
		userRequest.put(`http://localhost:3001/api/subject/edit/${state.subjectCourse}/${state.subjectId}`, {
			name: state.name,
			description: state.description,
			semester: state.semester,
			img: state.img,
			courseId: state.subjectCourse
		})
		.then((response) => {
			clearInputs(dispatch, ["name", "description", "img", "semester", "msg", "subjectCourse", "subjectId"])
			dispatch({type: "RESPONSE", payload: {msg: response.data.msg, statusMsg: 'success'}})
		})
		.catch((response) => {
			clearInputs(dispatch, ["name", "description", "img", "semester", "msg", "subjectCourse", "subjectId"])
			dispatch({type: "RESPONSE", payload: {msg: response.response.data.msg, statusMsg: ''}})
		})
	}

	return (
		<Container>
			<Sidebar location={user.url}/>
			<MainScroll id="main">
				<Title>Admin/Disciplinas</Title>
				<Tabs>
					<Tab onClick={() => handleTab(dispatch, 'novo')} className={state.type === 'novo' ? 'selected' : null}>Criar Disciplina</Tab>
					<Tab onClick={() => handleTab(dispatch, 'deletar')} className={state.type === 'deletar' ? 'selected' : null}>Remover Disciplina</Tab>
					<Tab onClick={() => handleTab(dispatch, 'editar')} className={state.type === 'editar' ? 'selected' : null}>Editar Disciplina</Tab>
				</Tabs>
				<Form>
					{state.type === 'novo' && 
						<>
							<Subtitle>Adicionar Disciplina</Subtitle>
							<Input onChange={(e) => dispatch({type: "SET_STATE", fieldName: "name", payload: e.target.value})} placeholder="Nome da Disciplina" required/>
							<TextArea onChange={(e) => dispatch({type: "SET_STATE", fieldName: "description", payload: e.target.value})} placeholder="Descrição da Disciplina" required></TextArea>
							<Select defaultValue="" onChange={(e) => dispatch({type: "SET_STATE", fieldName: "subjectCourse", payload: e.target.value})} required>
								<Option value="" disabled>Escolha um curso:</Option>
								{state.courses.map(course => (
									<Option value={course._id} key={course._id}>{course.name}</Option>
								))}
							</Select>
							<Input onChange={(e) => dispatch({type: "SET_STATE", fieldName: "semester", payload: e.target.value})} type="number" min="1" max="10" placeholder="Semestre da Disciplina" required/>
							<Input onChange={(e) => dispatch({type: "SET_STATE", fieldName: "img", payload: e.target.value})} placeholder="Thumbnail da Disciplina" required/>
							<Input onClick={(e) => newSubject(e)} style={{width: "40%", cursor: "pointer"}} type="submit" value="Adicionar Disciplina"/>
							{state.showMsg &&
								<SubmitCourse submit={state.statusMsg}>{state.msg}</SubmitCourse>
							}
						</>
					}
					{state.type === 'deletar' &&
						<>
							<Subtitle>Deletar Disciplina</Subtitle>
							<Select onChange={(e) => dispatch({type: "SET_STATE", fieldName: "subjectCourse", payload: e.target.value})} defaultValue={state.subjectCourse}>
								<Option value="" disabled>Escolha um curso:</Option>
								{state.courses.map(course => (
									<Option value={course._id} key={course._id}>{course.name}</Option>
								))}
							</Select>
							{state.subjectCourse &&
								<Select onChange={(e) => dispatch({type: "SET_STATE", fieldName: "semesterSelected", payload: e.target.value})} defaultValue={state.semesterSelected}>
									<Option defaultValue={0} disabled>Escolha um período:</Option>
									<Option value={1}>1º Período</Option>
									<Option value={2}>2º Período</Option>
									<Option value={3}>3º Período</Option>
									<Option value={4}>4º Período</Option>
									<Option value={5}>5º Período</Option>
									<Option value={6}>6º Período</Option>
									<Option value={7}>7º Período</Option>
									<Option value={8}>8º Período</Option>
									<Option value={9}>9º Período</Option>
									<Option value={10}>10º Período</Option>
								</Select>
							}
							<Select onChange={(e) => dispatch({type: "SET_STATE", fieldName: "subjectId", payload: e.target.value})} defaultValue={state.subjectId}>
								<Option value="" disabled>Escolha uma disciplina:</Option>
									{state.selectedSubjects.map((subject) => (
										<Option value={subject._id} key={subject._id}>{subject.name}</Option>
									))}
							</Select>
							<Input onClick={(e) => removeSubject(e)} style={{width: "40%", backgroundColor: "#d32f2f", color: "whitesmoke", cursor: "pointer"}} type="submit" value="Deletar"/>
							{state.showMsg &&
								<SubmitCourse submit={state.statusMsg}>{state.msg}</SubmitCourse>
							}
						</>
					}
					{state.type === 'editar' &&
						<>
							<Subtitle>Editar Disciplina</Subtitle>
							<Select onChange={(e) => dispatch({type: "SET_STATE", fieldName: "subjectCourse", payload: e.target.value})} defaultValue={state.subjectCourse}>
								<Option value="" disabled>Escolha um curso:</Option>
								{state.courses.map(course => (
									<Option value={course._id} key={course._id}>{course.name}</Option>
								))}
							</Select>
							{state.subjectCourse &&
								<Select onChange={(e) => dispatch({type: "SET_STATE", fieldName: "semesterSelected", payload: e.target.value})} defaultValue={parseInt(state.semester)}>
									<Option defaultValue="" disabled>Escolha um período:</Option>
									<Option value={1}>1º Período</Option>
									<Option value={2}>2º Período</Option>
									<Option value={3}>3º Período</Option>
									<Option value={4}>4º Período</Option>
									<Option value={5}>5º Período</Option>
									<Option value={6}>6º Período</Option>
									<Option value={7}>7º Período</Option>
									<Option value={8}>8º Período</Option>
									<Option value={9}>9º Período</Option>
									<Option value={10}>10º Período</Option>
								</Select>
							}
							<Select onChange={(e) => dispatch({type: "SET_STATE", fieldName: "subjectId", payload: e.target.value})} defaultValue="">
								<Option value="" disabled>Escolha uma disciplina:</Option>
									{state.selectedSubjects.map((subject) => (
										<Option value={subject._id} key={subject._id}>{subject.name}</Option>
									))}
							</Select>
							{state.subjectId &&
								<>
									<Input defaultValue={state.name} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "name", payload: e.target.value})} placeholder="Nome da Disciplina" required/>
									<TextArea defaultValue={state.description} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "description", payload: e.target.value})} placeholder="Descrição da Disciplina" required></TextArea>
									<Input defaultValue={state.semester} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "semester", payload: e.target.value})} type="number" min="1" max="10" placeholder="Semestre da Disciplina" required/>
									<Input defaultValue={state.img} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "img", payload: e.target.value})} placeholder="Thumbnail da Disciplina" required/>
								</>
							}
							<Input onClick={(e) => editSubject(e)} style={{width: "40%", cursor: "pointer"}} type="submit" value="Editar"/>
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

export default AdminSubjects