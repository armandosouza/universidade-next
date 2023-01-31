import styled from 'styled-components'
import request, {endpoints} from '../../request'

import {useSelector} from 'react-redux'
import {useParams, useNavigate, useLocation} from 'react-router-dom'
import {useState, useEffect} from 'react'

import SidebarStudy from '../../components/study/SidebarStudy'
import Title from '../../components/Title'

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	position: relative;
`

const Main = styled.div`
	width: 80%;
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

const Description = styled.p`
	font-size: 22px;
	text-align: center;
	margin: 10px 20px;
	line-height: 35px;
`

const Subtitle = styled.h3`
	text-decoration: underline;
	margin-left: 20px;
	font-size: 20px;
`

const Semesters = styled.div`
	margin: 20px;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
`

const Semester = styled.div`
	width: 240px;
	height: 270px;
	border-radius: 12px;
	box-shadow: 2px 3px 7px black;
	transition: .5s;
	cursor: pointer;
	margin: 20px;

	&:hover {
		transform: scale(1.05);
	}
`

const SemesterImg = styled.div`
	background: url(${props => props.bg});
	border-radius: 12px 12px 0 0;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	height: 70%;
	width: 100%;
`

const SemesterName = styled.h4`
	text-align: center;
	text-decoration: underline;
	margin-top: 15px;
	color: #3e3d53;
	font-size: 18px;
`

const CourseStudy = () => {
	const {courseId} = useParams()
	const navigate = useNavigate()
	const url = useLocation()
	const [course, setCourse] = useState({
		name: "",
		description: ""
	})
	const userRequest = request()

	useEffect(() => {
		userRequest.get(`${endpoints.course}/${courseId}`)
		.then((response) => {
			document.title = response.data.name
			setCourse({
				name: response.data.name,
				description: response.data.description
			})
		})
	}, [])

	return (
		<Container>
			<SidebarStudy/>
			<Main>
				<Title>{course.name}</Title>
				<Description>{course.description}</Description>
				<Subtitle>Períodos:</Subtitle>
				<Semesters>
					<Semester onClick={() => navigate(`${url.pathname}/1`)}>
						<SemesterImg bg="https://img.imageboss.me/revista-cdn/cdn/26812/4be31e51887f909295884505a7404dd549c3d7b5.jpg?1579898154"/>
						<SemesterName>1º Período</SemesterName>
					</Semester>
					<Semester onClick={() => navigate(`${url.pathname}/2`)}>
						<SemesterImg bg="https://imagens.usp.br/wp-content/uploads/0701_odontosalaaula003.jpg"/>
						<SemesterName>2º Período</SemesterName>
					</Semester>
					<Semester onClick={() => navigate(`${url.pathname}/3`)}>
						<SemesterImg bg="https://s2.static.brasilescola.uol.com.br/be/2021/03/seminario.jpg"/>
						<SemesterName>3º Período</SemesterName>
					</Semester>
					<Semester onClick={() => navigate(`${url.pathname}/4`)}>
						<SemesterImg bg="https://www.sp.senac.br/flash/galeria/centro_convencoes/images/10.jpg"/>
						<SemesterName>4º Período</SemesterName>
					</Semester>
					<Semester onClick={() => navigate(`${url.pathname}/5`)}>
						<SemesterImg bg="https://files.fabricadolivro.com.br/menu/normais/thumb-600x360-tcc-simples-categoria-t3.png"/>
						<SemesterName>5º Período</SemesterName>
					</Semester>
					<Semester onClick={() => navigate(`${url.pathname}/6`)}>
						<SemesterImg bg="https://imagens.ne10.uol.com.br/veiculos/_midias/jpg/2022/09/20/615x300/1_programa_de_estagio___shopee_2022-21746158.jpg"/>
						<SemesterName>6º Período</SemesterName>
					</Semester>
					<Semester onClick={() => navigate(`${url.pathname}/7`)}>
						<SemesterImg bg="https://www.infoescola.com/wp-content/uploads/2009/01/trabalho-grupo-723533071.jpg"/>
						<SemesterName>7º Período</SemesterName>
					</Semester>
					<Semester onClick={() => navigate(`${url.pathname}/8`)}>
						<SemesterImg bg="https://mlogu6g7z5ex.i.optimole.com/cb:GFmn~5192b/w:372/h:247/q:75/https://blog.facens.br/wp-content/uploads/2021/04/bibliotecas.png"/>
						<SemesterName>8º Período</SemesterName>
					</Semester>
					<Semester onClick={() => navigate(`${url.pathname}/9`)}>
						<SemesterImg bg="http://www.uniergs.com.br/images/noticias/img_599_foto_1.jpg"/>
						<SemesterName>9º Período</SemesterName>
					</Semester>
					<Semester onClick={() => navigate(`${url.pathname}/10`)}>
						<SemesterImg bg="https://blog.orientu.com.br/wp-content/uploads/2020/07/trainee2.jpeg"/>
						<SemesterName>10º Período</SemesterName>
					</Semester>
				</Semesters>
			</Main>
		</Container>
	)
}

export default CourseStudy