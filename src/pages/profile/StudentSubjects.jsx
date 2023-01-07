import styled from 'styled-components'

import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import Sidebar from '../../components/Sidebar'
import SidebarRight from '../../components/SidebarRight'
import Title from '../../components/Title'

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	position: relative;
`

const Tabs = styled.div`
	margin: 5px 0;
	padding: 0 5px;
	display: flex;
`

const Tab = styled.div`
	margin: 0 1px;
	border-radius: 9px 9px 0 0;
	background-color: #006994;
	color: whitesmoke;
	font-weight: bold;
	font-size: 14px;
	padding: 3px 5px;
	border: 1px solid lightblue;
	cursor: pointer;
	transition: .5s;

	&:hover {
		background-color: lightblue;
		color: black;
	}

	&.selected {
		background-color: lightblue;
		color: black;
	}
`

const Main = styled.div`
	width: 65%;
	height: 100vh;
	overflow-y: scroll;
`

const Subtitle = styled.h3`
	font-size: 24px;
	text-align: center;
	margin: 10px 0;
`

const MySubjects = styled.div`
	margin: 10px 0;
	width: 100%;
	padding: 10px 0;
	display: flex;
	align-items: center;
	flex-direction: column;
`

const Subject = styled.span`
	width: 80%;
	padding: 5px 0;
	margin: 5px 0;
	border: 1px solid lightgray;
	display: flex;
	justify-content: space-around;
	align-items: center;
	font-size: 16px;
`

const Icon = styled.i``
const SubjectName = styled.h4``
const Progress = styled.span``
const Semester = styled.span``
const Button = styled.span`
	padding: 5px 20px;
	background-color: #006994;
	color: lightblue;
	cursor: pointer;
	border-radius: 10px;

	&:hover {
		background-color: lightblue;
		color: #006994;
	}
`


const StudentSubjects = () => {
	const [tab, setTab] = useState('current')
	const user = useSelector(state => state.user[0])
	const navigate = useNavigate()

	useEffect(() => {
		document.title = `${user.name} | Disciplinas`
	}, [])

	if(!user) {
		return navigate('/login')
	}

	const handleTab = (status) => {
		setTab(status)
	}

	return (
		<Container>
			<Sidebar location={user.url}/>
			<Main id="main">
				<Title>Disciplinas</Title>
				<Tabs>
					<Tab onClick={() => handleTab('studied')} className={tab === 'studied' ? 'selected' : null}>Cursadas</Tab>
					<Tab onClick={() => handleTab('current')} className={tab === 'current' ? 'selected' : null}>Atuais</Tab>
					<Tab onClick={() => handleTab('study')} className={tab === 'study' ? 'selected' : null}>Próximas</Tab>
				</Tabs>
				{tab === 'current' &&
					<>
						<Subtitle>Disciplinas atuais:</Subtitle>
						<MySubjects>
							<Subject>
								<Icon className="fa-solid fa-graduation-cap"></Icon>
								<SubjectName>Cálculo I</SubjectName>
								<Semester>1º Período</Semester>
								<Progress>55% concluído</Progress>
								<Button>Entrar</Button>
							</Subject>
							<Subject>
								<Icon className="fa-solid fa-graduation-cap"></Icon>
								<SubjectName>Cálculo I</SubjectName>
								<Semester>1º Período</Semester>
								<Progress>55% concluído</Progress>
								<Button>Entrar</Button>
							</Subject>
						</MySubjects>
					</>
				}
			</Main>
			<SidebarRight avatar={user.avatar} name={user.name} admin={user.admin}/>
		</Container>
		)
}

export default StudentSubjects