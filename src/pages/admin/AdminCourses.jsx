import styled from 'styled-components'
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


const AdminCourses = () => {
	const {option} = useParams()
	const initialState = {type: option, msg: '', statusMsg: '', showMsg: false, name: '', description: '', level: '', tag: '', img: '', courses: [], courseId: ''}
	const [state, dispatch] = useReducer(reducer, initialState)
	const userRequest = request()
	const user = useSelector(state => state.user[0])

	useEffect(() => {
		document.title = `${user.name} | Admin | Cursos`
		userRequest.get(`${endpoints.course}`)
		.then((response) => {
			dispatch({type: "SET_COURSES", payload: [...response.data]})
		})
		.catch((response) => {
			dispatch({type: "RESPONSE", payload: {msg: response.response.data.msg, statusMsg: ''}})
		})
	}, [])

	useEffect(() => {
		clearInputs(dispatch, ["name", "description", "tag", "level", "img", "courseId"])
	}, [state.type])

	useEffect(() => {
		if(state.courseId) {
			userRequest.get(`${endpoints.course}/${state.courseId}`)
			.then((response) => {
				let course = response.data
				dispatch({type: "SET_COURSE", payload: {name: course.name, description: course.description, tag: course.tag, level: course.level, img: course.img}})
			})
			.catch((response) => {
				dispatch({type: "RESPONSE", payload: {msg: response.response.data.msg, statusMsg: ''}})
			})
		}
	}, [state.courseId])

	const newCourse = (e) => {
		e.preventDefault()
		userRequest.post(`${endpoints.course}/new`, {
			name: state.name, description: state.description, level: state.level, tag: state.tag, img: state.img 
		})
		.then((response) => {
			clearInputs(dispatch, ["name", "description", "tag", "level", "img", "courseId"])
			dispatch({type: "RESPONSE", payload: {msg: response.data.msg, statusMsg: 'success'}})
		})
		.catch((response) => {
			clearInputs(dispatch, ["name", "description", "tag", "level", "img", "courseId"])
			dispatch({type: "RESPONSE", payload: {msg: response.response.data.msg}})
		})
	}

	const submitEditCourse = (e) => {
		e.preventDefault()
		userRequest.put(`${endpoints.course}/edit/${state.courseId}`, {
			name: state.name, description: state.description, level: state.level, tag: state.tag, img: state.img
		})
		.then((response) => {
			dispatch({type: "RESPONSE", payload: {msg: response.data.msg, statusMsg: 'success'}})
			dispatch({type: "CLEAR_INPUTS", payload: ["name", "description", "tag", "level", "img", "courseId"]})
		})
		.catch((response) => {
			dispatch({type: "CLEAR_INPUTS", payload: ["name", "description", "tag", "level", "img", "courseId"]})
			dispatch({type: "RESPONSE", payload: {msg: response.response.data.msg}})
		})
	}

	const submitRemoveCourse = (e) => {
		e.preventDefault()
		userRequest.delete(`${endpoints.course}/delete/${state.courseId}`)
		.then((response) => {
			dispatch({type: "RESPONSE", payload: {msg: response.data.msg}})
		})
		.catch((response) => {
			dispatch({type: "RESPONSE", payload: {msg: response.response.data.msg}})
		})
	}

	return (
		<Container>
			<Sidebar location={user.url}/>
			<MainScroll id="main">
				<Title>Admin/Cursos</Title>
				<Tabs>
					<Tab onClick={() => handleTab(dispatch, 'novo')} className={state.type === 'novo' ? 'selected' : null}>Criar Curso</Tab>
					<Tab onClick={() => handleTab(dispatch, 'deletar')} className={state.type === 'deletar' ? 'selected' : null}>Remover Curso</Tab>
					<Tab onClick={() => handleTab(dispatch, 'editar')} className={state.type === 'editar' ? 'selected' : null}>Editar Curso</Tab>
				</Tabs>
				<Form>
					{state.type === 'novo' && 
						<>
							<Subtitle>Adicionar Curso</Subtitle>
							<Input onChange={(e) => dispatch({type: "SET_STATE", fieldName: "name", payload: e.target.value})} placeholder="Nome do Curso" required/>
							<TextArea onChange={(e) => dispatch({type: "SET_STATE", fieldName: "description", payload: e.target.value})} placeholder="Descrição do Curso" required></TextArea>
							<Select defaultValue="" onChange={(e) => dispatch({type: "SET_STATE", fieldName: "level", payload: e.target.value})} required>
								<Option value="" disabled={true}>Escolha um nível de Curso</Option>
								<Option value="Médio">Médio</Option>
								<Option value="Vestibular">Vestibular</Option>
								<Option value="Graduação">Graduação</Option>
								<Option value="Curso Livre">Curso Livre</Option>
								<Option value="Idiomas">Idiomas</Option>
							</Select>
							<Input onChange={(e) => dispatch({type: "SET_STATE", fieldName: "tag", payload: e.target.value})} placeholder="Tag do Curso" required/>
							<Input onChange={(e) => dispatch({type: "SET_STATE", fieldName: "img", payload: e.target.value})} placeholder="Thumbnail do Curso" required/>
							<Input onClick={(e) => newCourse(e)} style={{width: "40%", cursor: "pointer"}} type="submit" value="Adicionar Curso"/>
							{state.showMsg &&
								<SubmitCourse submit={state.statusMsg}>{state.msg}</SubmitCourse>
							}
						</>
					}
					{state.type === 'deletar' &&
						<>
							<Subtitle>Deletar Curso</Subtitle>
							<Select onChange={(e) => dispatch({type: "SET_STATE", fieldName: "courseId", payload: e.target.value})} defaultValue={state.courseId}>
								<Option value="" disabled>Escolha um curso</Option>
								{state.courses.map(course => (
									<Option value={course._id} key={course._id}>{course.name}</Option>
								))}
							</Select>
							<Input onClick={(e) => submitRemoveCourse(e)} style={{width: "40%", backgroundColor: "#d32f2f", color: "whitesmoke", cursor: "pointer"}} type="submit" value="Deletar"/>
							{state.showMsg &&
								<SubmitCourse submit={state.statusMsg}>{state.msg}</SubmitCourse>
							}
						</>
					}
					{state.type === 'editar' &&
						<>
							<Subtitle>Editar Curso</Subtitle>
							<Select onChange={(e) => dispatch({type: "SET_STATE", fieldName: "courseId", payload: e.target.value})} defaultValue={state.courseId}>
								<Option value="" disabled>Escolha um curso</Option>
								{state.courses.map(course => (
									<Option value={course._id} key={course._id}>{course.name}</Option>
								))}
							</Select>
							<Input placeholder={state.name || 'Nome do curso'} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "name", payload: e.target.value})} required={true}/>
							<TextArea placeholder={state.description || 'Descrição do curso'} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "description", payload: e.target.value})} required={true}/>
							<Select value={state.level} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "level", payload: e.target.value})} required={true}>
								<Option value="" disabled>Escolha um nível de Curso</Option>
								<Option value="Médio">Médio</Option>
								<Option value="Vestibular">Vestibular</Option>
								<Option value="Graduação">Graduação</Option>
								<Option value="Curso Livre">Curso Livre</Option>
								<Option value="Idiomas">Idiomas</Option>
							</Select>
							<Input placeholder={state.tag || 'Tag do curso'} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "tag", payload: e.target.value})} required={true}/>
							<Input placeholder={state.img || 'Thumbnail do curso'} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "img", payload: e.target.value})} required={true}/>
							<Input onClick={(e) => submitEditCourse(e)} style={{width: "40%", cursor: "pointer"}} type="submit" value="Editar Curso"/>
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

export default AdminCourses