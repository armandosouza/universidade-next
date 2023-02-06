import styled from 'styled-components'
import {device} from '../responsive'
import request, {endpoints} from '../request'
import reducer from '../reducer'

import {useReducer, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import {editUser} from '../redux/features/userSlice'

import Sidebar from '../components/Sidebar'
import SidebarRight from '../components/SidebarRight'

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

	@media ${device.mobileP} {
		width: 75%;
	}
`

const Cover = styled.div`
	width: 100%;
	height: 30vh;
	background: url(${(props) => props.bg});
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	position: relative;
`

const ProfileName = styled.h3`
	color: whitesmoke;
	font-size: 32px;
	position: absolute;
	top: 20px;
	left: 20px;
`

const Status = styled.h4`
	color: whitesmoke;
	font-size: 1em;
	position: absolute;
	top: 70px;
	left: 20px;
`

const Badges = styled.div`
	position: absolute;
	bottom: 10px;
	left: 20px;
	display: flex;
`

const Badge = styled.img`
	width: 30px;
	height: 30px;
	margin: 0 5px;
`

const Info = styled.span`
	background-color: #e6e2e1;
	padding: 3px 5px;
	font-size: 12px;
	position: absolute;
	bottom: 50px;
	height: 20px;
	left: 20px;
	border-radius: 9px;
`

const ChangeCoverPhoto = styled.span`
	position: absolute;
	bottom: 10px;
	right: 10px;
	border-radius: 9px;
	background-color: #e6e2e1;
	font-size: 16px;
	padding: 5px 10px;
	transition: .5s;
	cursor: pointer;
	display: block;

	&:hover {
		background-color: aquamarine;
	}
`

const StatusProfile = styled.div`
	display: flex;
	margin: 10px 0;
	justify-content: space-evenly;
	flex-wrap: wrap;
	position: relative;
`

const StatusItem = styled.div`
	border: 1px solid aquamarine;
	width: 200px;
	height: 150px;
	text-align: center;
	font-size: 18px;
	cursor: pointer;
	transition: .5s;
	margin: 10px;
	border-radius: 9px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	& span {
		font-weight: bold;
		margin-top: 4px;
	}

	&:hover {
		background-color: aquamarine;
	}
`

const Lessons = styled(StatusItem)``
const Achievements = styled(StatusItem)``
const Diplomas = styled(StatusItem)``

const Icon = styled.i`
	margin-bottom: 4px;
	font-size: 22px;
`

const EditProfile = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 10px;
	padding-bottom: 20px;
`

const Input = styled.input`
	height: 40px;
	width: 70%;
	font-family: 'Didact Gothic', sans-serif;
	font-size: 20px;
	border-radius: 9px;
	outline: none;
	border: 1px solid #e6e2e1;
	text-align: center;
	margin: 10px 0;
`

const Label = styled.label`
	margin-top: 10px;
	font-size: 18px;
`

const Buttons = styled.div`
	margin: 20px 0;
	display: flex;
	justify-content: center;
`

const Submit = styled.span`
	margin: 0 20px;
	padding: 5px 10px;
	border-radius: 9px;
	border: 1px solid #e6e2e1;
	text-align: center;
	transition: .5s;
	font-size: 20px;
	cursor: pointer;

	&:hover {
		background-color: lightgreen;
	}
`

const Cancel = styled(Submit)`
	&:hover {
		background-color: #ff9194;
	}
`

const Alert = styled.div`
	z-index: 2;
	width: 30%;
	height: 30%;
	position: absolute;
	margin: auto;
	top: 35%;
	left: 35%;
	background-color: whitesmoke;
	box-shadow: 1px 1px 3px black;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const CloseModal = styled.i`
	position: absolute;
	top: 5px;
	right: 5px;
	cursor: pointer;
	font-size: 18px;
	transition: .5s;

	&:hover {
		color: red;
	}
`

const Profile = () => {
	const initialState = {info: "Medalha por ter feito 100 aulas", showButton: false, status: "", profilePhoto: "", coverPhoto: "", showModal: false, showModalButton: false, msgModal: "Deseja editar seu perfil?"}
	const [state, dispatchState] = useReducer(reducer, initialState)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector(state => state.user[0])
	const userRequest = request()
		
	if(!user) {
		navigate('/login')
	}
	
	useEffect(() => {
		document.title = `${user.name} | Perfil`
	}, [])

	const showModalandButton = () => {
		dispatchState({type: "SHOW_MODAL"})
	}

	const closeModal = () => {
		dispatchState({type: "CLOSE_MODAL"})
	}

	const handleInput = (value, type) => {
		switch(type) {
			case 'status':
				dispatchState({type: "SET_STATE", fieldName: type, payload: value})
				break
			case 'fotoPerfil':
				dispatchState({type: "SET_STATE", fieldName: type, payload: value})
				break
			case 'fotoCapa':
				dispatchState({type: "SET_STATE", fieldName: type, payload: value})
				break
			default:
				break
		}
	}

	const submitEditedUser = (e) => {
		e.preventDefault()

		userRequest.put(`${endpoints.user}/edit/${user.id}`, {
			profileImg: state.coverPhoto || user.profileImg,
			avatar: state.profilePhoto || user.avatar,
			status: state.status || user.status
		}).then((response) => {
			dispatch(editUser({
				profileImg: response.data.user.profileImg,
				avatar: response.data.user.avatar,
				status: response.data.user.status
			}))
			dispatchState({type: "SET_STATE", fieldName: "showModalButton", payload: false})
			dispatchState({type: "SET_STATE", fieldName: "msgModal", payload: response.data.msg})
		}).catch((response) => {
			if(response.response.status === 401) {
				return navigate('/login')
			} else {
				dispatchState({type: "SET_STATE", fieldName: "showModalButton", payload: false})
				dispatchState({type: "SET_STATE", fieldName: "msgModal", payload: response.response.data.msg})
			}
		})
	}


	return (
		<Container>
			{state.showModal &&
				<Alert>
					<CloseModal onClick={closeModal} className="fa-solid fa-circle-xmark"></CloseModal>
					{state.msgModal}
					{state.showModal && state.showModalButton &&
						<Submit onClick={(e) => submitEditedUser(e)}
						style={{marginTop: "20px", fontSize: "16px"}}>
							Sim
						</Submit>
					}
				</Alert>
			}
			<Sidebar location={user.url}/>
			<Main id="main">
				<Cover onMouseEnter={() => dispatchState({type: "SET_STATE", fieldName: "showButton", payload: !state.showButton})} onMouseLeave={() => dispatchState({type: "SET_STATE", fieldName: "showButton", payload: !state.showButton})} bg={user.profileImg}>
					<ProfileName>{user.name}</ProfileName>
					<Status>{user.status}</Status>
					<Info>{state.info}</Info>
					<Badges>
						<Badge src="https://cdn.iconscout.com/icon/free/png-256/5-star-medal-4175541-3474613.png"/>
					</Badges>
					{state.showButton &&
						<ChangeCoverPhoto>Trocar foto</ChangeCoverPhoto>
					}
				</Cover>
				<StatusProfile>
					<Lessons>
						<Icon className="fa-solid fa-pencil"></Icon>
						Aulas assistidas: 
						<span>175</span>
					</Lessons>
					<Achievements>
						<Icon className="fa-solid fa-star"></Icon>
						Conquistas: 
						<span>12</span>
					</Achievements>
					<Diplomas>
						<Icon className="fa-solid fa-certificate"></Icon>
						Certificados
					</Diplomas>
				</StatusProfile>
				<EditProfile>
					<Label htmlFor="nome">Nome:</Label>
					<Input name="nome" placeholder={user.name} readOnly />
					<Label htmlFor="status">Status:</Label>
					<Input onChange={e => handleInput(e.target.value, 'status')} name="status" placeholder="Estou estudando!" />
					<Label htmlFor="fotoPerfil">Foto de Perfil:</Label>
					<Input onChange={e => handleInput(e.target.value, 'fotoPerfil')} name="fotoPerfil" placeholder="Digite a url da novo foto de perfil" />
					<Label htmlFor="fotoCapa">Foto de Capa:</Label>
					<Input onChange={e => handleInput(e.target.value, 'fotoCapa')} name="fotoCapa" placeholder="Digite a url da novo foto de capa" />
					<Buttons>
						<Submit onClick={showModalandButton}>Alterar</Submit>
						<Cancel onClick={() => navigate(-1)}>Cancelar</Cancel>
					</Buttons>
				</EditProfile>
			</Main>
			<SidebarRight avatar={user.avatar} name={user.name} admin={user.admin}/>
		</Container>
		)
}

export default Profile