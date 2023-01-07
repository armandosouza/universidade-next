import styled from 'styled-components'
import axios from 'axios'

import {useState, useEffect} from 'react'
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

const Lessons = styled(StatusItem)`
	
`

const Achievements = styled(StatusItem)`
	
`

const Diplomas = styled(StatusItem)`
	
`

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
	const [info, setInfo] = useState('Medalha por ter feito 100 aulas')
	const [showButton, setShowButton] = useState(false)
	const [status, setStatus] = useState('')
	const [fotoPerfil, setFotoPerfil] = useState('')
	const [fotoCapa, setFotoCapa] = useState('')
	const [showModal, setShowModal] = useState(false)
	const [showModalButton, setShowModalButton] = useState(false)
	const [msgModal, setMsgModal] = useState('Deseja editar seu perfil?')

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector(state => state.user[0])
	
	useEffect(() => {
		document.title = `${user.name} | Perfil`
	}, [])
		
	if(!user) {
		return navigate('/login')
	}

	const showModalandButton = () => {
		setShowModal(true)
		setShowModalButton(true)
	}

	const closeModal = () => {
		setShowModal(false)
		setMsgModal('Deseja editar seu perfil?')
	}

	const handleInput = (e, type) => {
		switch(type) {
			case 'status':
				setStatus(e.target.value)
				break
			case 'fotoPerfil':
				setFotoPerfil(e.target.value)
				break
			case 'fotoCapa':
				setFotoCapa(e.target.value)
				break
			default:
				break
		}
	}

	const submitEditedUser = (e) => {
		console.log(fotoPerfil)
		e.preventDefault()
		const requestUser = axios.create({
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})

		requestUser.put(`http://localhost:3001/api/user/edit/${user.id}`, {
			profileImg: fotoCapa || user.profileImg,
			avatar: fotoPerfil || user.avatar,
			status: status || user.status
		}).then((response) => {
			let msg = response.data.msg
			let user = response.data.user

			dispatch(editUser({
				profileImg: user.profileImg,
				avatar: user.avatar,
				status: user.status
			}))
			setShowModalButton(false)
			setMsgModal(response.data.msg)

		}).catch((response) => {
			if(response.response.status === 401) {
				return navigate('/login')
			} else {
				setShowModalButton(false)
				setMsgModal(response.response.data.msg)
			}
		})
	}


	return (
		<Container>
			{showModal &&
				<Alert>
					<CloseModal onClick={closeModal} className="fa-solid fa-circle-xmark"></CloseModal>
					{msgModal}
					{showModal && showModalButton &&
						<Submit onClick={(e) => submitEditedUser(e)}
						style={{marginTop: "20px", fontSize: "16px"}}>
							Sim
						</Submit>
					}
				</Alert>
			}
			<Sidebar location={user.url}/>
			<Main id="main">
				<Cover onMouseEnter={() => setShowButton(!showButton)} onMouseLeave={() => setShowButton(!showButton)} bg={user.profileImg}>
					<ProfileName>{user.name}</ProfileName>
					<Status>{user.status}</Status>
					<Info>{info}</Info>
					<Badges>
						<Badge src="https://cdn.iconscout.com/icon/free/png-256/5-star-medal-4175541-3474613.png"/>
					</Badges>
					{showButton &&
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
					<Input onChange={e => handleInput(e, 'status')} name="status" placeholder="Estou estudando!" />
					<Label htmlFor="fotoPerfil">Foto de Perfil:</Label>
					<Input onChange={e => handleInput(e, 'fotoPerfil')} name="fotoPerfil" placeholder="Digite a url da novo foto de perfil" />
					<Label htmlFor="fotoCapa">Foto de Capa:</Label>
					<Input onChange={e => handleInput(e, 'fotoCapa')} name="fotoCapa" placeholder="Digite a url da novo foto de capa" />
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