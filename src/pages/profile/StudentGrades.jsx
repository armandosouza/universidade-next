import styled from 'styled-components'
import {device} from '../../responsive'
import request, {endpoints} from '../../request'

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

const Main = styled.div`
	width: 65%;
	height: 100vh;
	position: relative;

	@media ${device.mobileP} {
		width: 75%;

		overflow-y: scroll;

		::-webkit-scrollbar {
			height: 10px;
		}

		::-webkit-scrollbar-track {
			background: lightgray;
			border-radius: 30px;
		}

		::-webkit-scrollbar-thumb {
			background: gray;
			border-radius: 30px;
		}
	}
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

	@media ${device.mobileP} {
		width: 75%;
	}
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
	const [semester, setSemester] = useState(0)
	const [grades, setGrades] = useState([])
	const [gradesSemester, setGradesSemester] = useState([])
	const user = useSelector(state => state.user[0])
	const navigate = useNavigate()
	const userRequest = request()

	useEffect(() => {
		if(!user) {
			return navigate('/login')
		}

		document.title = `${user.name} | Notas`
		userRequest.get(`${endpoints.course}/grades/user/${user.id}`)
		.then((response) => {
			if(response.data.length > 0) {
				setGrades(...response.data)
				setSemester(1)
			}
		})
	}, [])

	useEffect(() => {
		const gradesSemester = grades.filter((grade) => grade.semester === semester)
		setGradesSemester(gradesSemester)
	}, [semester])

	const handleTab = (tab) => {
		setSemester(tab)
	}

	return (
		<Container>
			<Sidebar location={user.url}/>
			<Main id="main">
				<Title>Notas</Title>
				<Subtitle>Confira suas notas abaixo:</Subtitle>
				<Tabs>
					<Tab className={semester === 1 ? 'selected' : null} onClick={() => handleTab(1)}>1º Período</Tab>
					<Tab className={semester === 2 ? 'selected' : null} onClick={() => handleTab(2)}>2º Período</Tab>
					<Tab className={semester === 3 ? 'selected' : null} onClick={() => handleTab(3)}>3º Período</Tab>
					<Tab className={semester === 4 ? 'selected' : null} onClick={() => handleTab(4)}>4º Período</Tab>
					<Tab className={semester === 5 ? 'selected' : null} onClick={() => handleTab(5)}>5º Período</Tab>
					<Tab className={semester === 6 ? 'selected' : null} onClick={() => handleTab(6)}>6º Período</Tab>
					<Tab className={semester === 7 ? 'selected' : null} onClick={() => handleTab(7)}>7º Período</Tab>
					<Tab className={semester === 8 ? 'selected' : null} onClick={() => handleTab(8)}>8º Período</Tab>
					<Tab className={semester === 9 ? 'selected' : null} onClick={() => handleTab(9)}>9º Período</Tab>
					<Tab className={semester === 10 ? 'selected' : null} onClick={() => handleTab(10)}>10º Período</Tab>
				</Tabs>
				{gradesSemester.length > 0 ?
					<>
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
									{gradesSemester.map((grade) => (
										<GradeRow>
											<GradeCell>{grade.subject}</GradeCell>
											<GradeCell>{grade.grade.$numberDecimal}</GradeCell>
											<GradeCell>{grade.grade.$numberDecimal >= 7 ? 'Aprovado': 'Reprovado'}</GradeCell>
										</GradeRow>
									))}
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
					</>
					:
					<p style={{textAlign: "center", marginTop: "40px", fontSize: "24px"}}>Você não tem notas nos cursos recentes ainda!</p>
				}
			</Main>
			<SidebarRight avatar={user.avatar} name={user.name} admin={user.admin}/>
		</Container>
		)
}

export default StudentGrades