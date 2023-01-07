import styled from 'styled-components'

import {useEffect} from 'react'
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

const Main = styled.div`
	width: 65%;
	height: 100vh;
	position: relative;
`

const Subtitle = styled.h3`
	font-size: 24px;
	text-align: center;
	margin: 10px 0;
`

const Tabs = styled.div`
	margin: 5px 20px;
	padding: 0 5px;
	display: flex;
	justify-content: center;
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

const GradesContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`

const GradesTable = styled.table`
	margin-top: 10px;
	width: 90%;
	border: 2px solid #006994;
`
const GradeRow = styled.tr`
	padding: 20px;
`

const GradeCell = styled.td`
	text-align: center;
	padding: 10px;
`
const GradesHead = styled.thead`
	font-size: 18px;
`
const GradesBody = styled.tbody``
const FinalGrade = styled.p`
	margin: 10px 0;
	font-size: 16px;
	text-align: center;
`

const Menu = styled.div`
	margin: 20px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const Button = styled.span`
	border: 1px solid #e6e2e1;
	border-radius: 9px;
	padding: 5px 10px;
	cursor: pointer;
	transition: .5s;
	margin: 5px 0;

	&:hover {
		background-color: #006994;
		color: whitesmoke;
	}
`

const StudentGrades = () => {
	const user = useSelector(state => state.user[0])
	const navigate = useNavigate()

	useEffect(() => {
		document.title = `${user.name} | Notas`
	}, [])

	if(!user) {
		return navigate('/login')
	}

	return (
		<Container>
			<Sidebar location={user.url}/>
			<Main id="main">
				<Title>Notas</Title>
				<Subtitle>Confira suas notas abaixo:</Subtitle>
				<Tabs>
					<Tab>1º Período</Tab>
					<Tab>2º Período</Tab>
					<Tab>3º Período</Tab>
					<Tab>4º Período</Tab>
					<Tab>5º Período</Tab>
					<Tab>6º Período</Tab>
					<Tab>7º Período</Tab>
					<Tab>8º Período</Tab>
				</Tabs>
				<GradesContainer>
					<GradesTable cellspacing="30">
						<GradesHead>
							<GradeRow>
								<GradeCell>Disciplina</GradeCell>
								<GradeCell>Média Final</GradeCell>
								<GradeCell>Situação</GradeCell>
							</GradeRow>
						</GradesHead>
						<GradesBody>
							<GradeRow>
								<GradeCell>Cálculo I</GradeCell>
								<GradeCell>8.6</GradeCell>
								<GradeCell>Aprovado</GradeCell>
							</GradeRow>
							<GradeRow>
								<GradeCell>Álgebra Linear</GradeCell>
								<GradeCell>7.2</GradeCell>
								<GradeCell>Aprovado</GradeCell>
							</GradeRow>
						</GradesBody>
					</GradesTable>
				</GradesContainer>
				<FinalGrade>
					Seu aproveitamento geral é de: <b>8.9</b>
				</FinalGrade>
				<Menu>
					<Button>
						<i style={{marginRight: "5px"}} className="fa-solid fa-file-pdf"></i>
						Boletim em PDF
					</Button>
					<Button>
						<i style={{marginRight: "5px"}} className="fa-solid fa-book-open"></i>
						Ver disciplinas
					</Button>
				</Menu>
			</Main>
			<SidebarRight avatar={user.avatar} name={user.name} admin={user.admin}/>
		</Container>
		)
}

export default StudentGrades