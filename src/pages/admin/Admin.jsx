import styled from 'styled-components'
import axios from 'axios'

import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {logout} from '../../redux/features/userSlice'

import Sidebar from '../../components/Sidebar'
import SidebarRight from '../../components/SidebarRight'
import Title from '../../components/Title'

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	position: relative;
`

const Main = styled.div`
	width: 65%;
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

const AdminMenu = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 10px 0;
	justify-content: center;
	align-items: center;
`

const Subtitle = styled.h3`
	font-size: 24px;
	text-decoration: underline;
	margin-left: 15px;
	margin-top: 10px;
	color: #006994;

	&::before {
		content: '- ';
	}
`

const AdminOption = styled.span`
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

const Form = styled.form`
	position: absolute;
	width: 80%;
	height: 80%;
	bottom: 10%;
	left: 10%;
	background-color: white;
	z-index: 2;
	box-shadow: 3px 5px 10px black;
	border-radius: 15px;
`

const Admin = () => {
	const user = useSelector(state => state.user[0])
	const navigate = useNavigate()
	const dispatch = useDispatch()

	if(!user) {
		navigate('/login')
	}

	const handleLogout = () => {
		axios.post(`http://localhost:3001/api/auth/logout`)
		.then(() => {
			localStorage.removeItem("token")
			dispatch(logout())
			navigate('/login')
		})
	}

	return (
		<Container>
			<Sidebar location={user.url}/>
			<Main id="main">
				<Title>Admin</Title>
				<Subtitle>Cursos</Subtitle>
				<AdminMenu>
					<AdminOption onClick={() => navigate('cursos/novo')}>
						<i className="fa-solid fa-plus"></i>
						<span>Criar Curso</span>
					</AdminOption>
					<AdminOption onClick={() => navigate('cursos/deletar')}>
						<i className="fa-solid fa-trash"></i>
						<span>Remover Curso</span>
					</AdminOption>
					<AdminOption onClick={() => navigate('cursos/editar')}>
						<i className="fa-solid fa-pencil"></i>
						<span>Editar Curso</span>
					</AdminOption>
				</AdminMenu>
				<Subtitle>Disciplinas</Subtitle>
				<AdminMenu>
					<AdminOption onClick={() => navigate('disciplinas/novo')}>
						<i className="fa-solid fa-plus"></i>
						<span>Criar Disciplina</span>
					</AdminOption>
					<AdminOption onClick={() => navigate('disciplinas/deletar')}>
						<i className="fa-solid fa-trash"></i>
						<span>Remover Disciplina</span>
					</AdminOption>
					<AdminOption onClick={() => navigate('disciplinas/editar')}>
						<i className="fa-solid fa-pencil"></i>
						<span>Editar Disciplina</span>
					</AdminOption>
				</AdminMenu>
				<Subtitle>Aulas</Subtitle>
				<AdminMenu>
					<AdminOption onClick={() => navigate('aulas/novo')}>
						<i className="fa-solid fa-note-sticky"></i>
						<span>Criar Aula</span>
					</AdminOption>
					<AdminOption onClick={() => navigate('aulas/novo')}>
						<i className="fa-solid fa-note-sticky"></i>
						<span>Criar Tarefa</span>
					</AdminOption>
					<AdminOption onClick={() => navigate('aulas/novo')}>
						<i className="fa-solid fa-note-sticky"></i>
						<span>Criar Prova</span>
					</AdminOption>
					<AdminOption onClick={() => navigate('aulas/novo')}>
						<i className="fa-solid fa-note-sticky"></i>
						<span>Criar Pesquisa</span>
					</AdminOption>
					<AdminOption onClick={() => navigate('aulas/deletar')}>
						<i className="fa-solid fa-trash"></i>
						<span>Remover Tarefa</span>
					</AdminOption>
					<AdminOption onClick={() => navigate('aulas/editar')}>
						<i className="fa-solid fa-pencil"></i>
						<span>Editar Tarefa</span>
					</AdminOption>
				</AdminMenu>
				<Subtitle>Questões</Subtitle>
				<AdminMenu>
					<AdminOption onClick={() => navigate('questão/novo')}>
						<i className="fa-solid fa-note-sticky"></i>
						<span>Criar Questão</span>
					</AdminOption>
					<AdminOption onClick={() => navigate('questão/deletar')}>
						<i className="fa-solid fa-note-sticky"></i>
						<span>Remover Questão</span>
					</AdminOption>
					<AdminOption onClick={() => navigate('questão/editar')}>
						<i className="fa-solid fa-note-sticky"></i>
						<span>Editar Questão</span>
					</AdminOption>
				</AdminMenu>
				<Subtitle>Administrativo</Subtitle>
				<AdminMenu>
					<AdminOption onClick={() => navigate('permissão/novo')}>
						<i className="fa-solid fa-user-plus"></i>
						<span>Dar Permissão</span>
					</AdminOption>
					<AdminOption onClick={() => navigate('permissão/deletar')}>
						<i className="fa-solid fa-user-minus"></i>
						<span>Remover Permissão</span>
					</AdminOption>
					<AdminOption onClick={handleLogout}>
						<i className="fa-solid fa-person-walking"></i>
						<span>Fazer logout</span>
					</AdminOption>
				</AdminMenu>
			</Main>
			<SidebarRight avatar={user.avatar} name={user.name}/>
		</Container>
		)
}

export default Admin