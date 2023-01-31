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


const AdminPermissions = () => {
	const {option} = useParams()
	const initialState = {type: option, msg: '', statusMsg: '', showMsg: false, users: [], selectedUser: ''}
	const [state, dispatch] = useReducer(reducer, initialState)
	const userRequest = request()
	const user = useSelector(state => state.user[0])

	useEffect(() => {
		userRequest.get(`${endpoints.user}`)
		.then((response) => {
			dispatch({type: "SET_USERS", payload: [...response.data]})
		})
		.catch((response) => {
			dispatch({type: "RESPONSE", payload: {msg: response.response.data.msg, statusMsg: ''}})
		})
	}, [])

	useEffect(() => {
		clearInputs(dispatch, ["selectedUser", "msg"])
	}, [state.type])

	const newPermission = (e) => {
		e.preventDefault()
		userRequest.post(`${endpoints.user}/permission/${state.selectedUser}`)
		.then((response) => {
			dispatch({type: "RESPONSE", payload: {msg: response.data.msg, statusMsg: 'success'}})
		}).catch((response) => {
			dispatch({type: "RESPONSE", payload: {msg: response.response.data.msg, statusMsg: ''}})
		})
	}

	const removePermission = (e) => {
		e.preventDefault()
		userRequest.delete(`${endpoints.user}/permission/${state.selectedUser}`)
		.then((response) => {
			dispatch({type: "RESPONSE", payload: {msg: response.data.msg, statusMsg: 'success'}})
		})
		.catch((response) => {
			dispatch({type: "RESPONSE", payload: {msg: response.response.data.msg, statusMsg: ''}})
		})
	}

	return (
		<Container>
			<Sidebar location={user.url}/>
			<MainScroll id="main">
				<Title>Admin/Permissão</Title>
				<Tabs>
					<Tab onClick={() => handleTab(dispatch, 'novo')} className={state.type === 'novo' ? 'selected' : null}>Dar Permissão</Tab>
					<Tab onClick={() => handleTab(dispatch, 'deletar')} className={state.type === 'deletar' ? 'selected' : null}>Remover Permissão</Tab>
				</Tabs>
				<Form>
					{state.type === 'novo' && 
						<>
							<Subtitle>Adicionar Permissão</Subtitle>
							<Select defaultValue={state.selectedUser} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "selectedUser", payload: e.target.value})} required>
								<Option value="" disabled>Escolha um usuário:</Option>
								{state.users.map(user => (
									<Option value={user._id} key={user._id}>{`${user.name} - ${user.email}`}</Option>
								))}
							</Select>
							<Input onClick={(e) => newPermission(e)} style={{width: "40%", cursor: "pointer"}} type="submit" value="Adicionar Permissão"/>
							{state.showMsg &&
								<SubmitCourse submit={state.statusMsg}>{state.msg}</SubmitCourse>
							}
						</>
					}
					{state.type === 'deletar' &&
						<>
							<Subtitle>Remover Permissão</Subtitle>
							<Select defaultValue={state.selectedUser} onChange={(e) => dispatch({type: "SET_STATE", fieldName: "selectedUser", payload: e.target.value})} required>
								<Option value="" disabled>Escolha um usuário:</Option>
								{state.users.map(user => (
									<Option value={user._id} key={user._id}>{`${user.name} - ${user.email}`}</Option>
								))}
							</Select>
							<Input onClick={(e) => removePermission(e)} style={{width: "40%", cursor: "pointer", color: "white", backgroundColor: "#d32f2f"}} type="submit" value="Remover Permissão"/>
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

export default AdminPermissions