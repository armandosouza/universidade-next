import styled from 'styled-components'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Container = styled.div``

const Main = styled.div`
	width: 100%;
	padding: 20px 0;
`

const Title = styled.h2`
	font-size: 40px;
	text-align: center;
`

const Subtitle = styled.h3`
	font-size: 24px;
	text-align: center;
	margin: 10px 0;
`

const CourseContainer = styled.div`
	display: flex;
	width: 90%;
	margin: 20px auto;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;
`

const Course = styled.div`
	background: url("${props => props.bg}");
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	width: 200px;
	height: 200px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	border-radius: 9px;
	box-shadow: 1px 2px 4px black;
	transition: .5s;
	margin: 20px 10px 0;

	&:hover {
		box-shadow: 2px 4px 14px black;
	}
`

const Icon = styled.i`
	color: black;
	margin-bottom: 5px;
	font-size: 30px;
`

const CourseName = styled.h6`
	color: black;
	font-size: 16px;
	background: white;
	width: 100%;
	text-align: center;
`

const Courses = () => {
	return (
		<Container>
			<Navbar bg="https://images.alphacoders.com/109/1091572.png"/>
			<Main>
				<Title>Cursos</Title>
				<Subtitle>Veja a lista de cursos ofertados na Universidade Next:</Subtitle>
				<CourseContainer>
					<Course bg="https://www.unicesumar.edu.br/blog/wp-content/uploads/2017/07/engenharia-de-producao.jpg">
						<Icon className="fa solid fa-gear"></Icon>
						<CourseName>Engenharia de Produção</CourseName>
					</Course>
					<Course bg="https://engenha.com/noticias/75946.jpg">
						<Icon className="fa solid fa-gear"></Icon>
						<CourseName>Engenharia Mecânica</CourseName>
					</Course>
					<Course bg="https://www.unicesumar.edu.br/blog/wp-content/uploads/2017/07/engenharia-de-software-mercado.jpg">
						<Icon className="fa solid fa-computer"></Icon>
						<CourseName>Engenharia de Software</CourseName>
					</Course>
					<Course bg="http://sites.unoeste.br/blog-unoeste/wp-content/uploads/2021/06/Diferenca-arquitetura-civil.jpg">
						<Icon className="fa solid fa-home"></Icon>
						<CourseName>Engenharia Civil</CourseName>
					</Course>
					<Course bg="https://static.mundoeducacao.uol.com.br/vestibular/2021/03/engenharia-eletrica.jpg">
						<Icon className="fa solid fa-bolt"></Icon>
						<CourseName>Engenharia Elétrica</CourseName>
					</Course>
					<Course bg="https://multivix.edu.br/wp-content/uploads/2019/01/engenharia-quimica.jpg">
						<Icon className="fa solid fa-atom"></Icon>
						<CourseName>Engenharia Química</CourseName>
					</Course>
					<Course bg="https://engenharia360.com/wp-content/uploads/2012/11/engenhariadealimentos-gui-das-engenharias3.jpg.jpg">
						<Icon className="fa solid fa-atom"></Icon>
						<CourseName>Engenharia de Alimentos</CourseName>
					</Course>
					<Course bg="https://static.mundoeducacao.uol.com.br/vestibular/2020/10/engenharia-nuclear.jpg">
						<Icon className="fa solid fa-atom"></Icon>
						<CourseName>Engenharia Nuclear</CourseName>
					</Course>
					<Course bg="https://www.institutodeengenharia.org.br/site/wp-content/uploads/2018/02/Engenharia-Florestal.jpg">
						<Icon className="fa solid fa-atom"></Icon>
						<CourseName>Engenharia Florestal</CourseName>
					</Course>
					<Course bg="https://gaiajr.com/wp-content/uploads/2020/07/Engenharia-Ambiental-1200x675-1.png">
						<Icon className="fa solid fa-atom"></Icon>
						<CourseName>Engenharia Ambiental</CourseName>
					</Course>
					<Course bg="https://cer.sebrae.com.br/wp-content/uploads/2020/11/GettyImages-165581405.jpg">
						<Icon className="fa solid fa-atom"></Icon>
						<CourseName>Geografia</CourseName>
					</Course>
					<Course bg="https://s1.static.brasilescola.uol.com.br/be/conteudo/images/1-historia.jpg">
						<Icon className="fa solid fa-atom"></Icon>
						<CourseName>História</CourseName>
					</Course>
					<Course bg="https://i0.wp.com/blog.portaleducacao.com.br/wp-content/uploads/2022/03/Para-que-serve-a-filosofia.jpg">
						<Icon className="fa solid fa-atom"></Icon>
						<CourseName>Filosofia</CourseName>
					</Course>
					<Course bg="https://v5j9q4b5.rocketcdn.me/wp-content/uploads/2022/06/20-fatos-legais-e-divertidos-sobre-matematica-e1654302576479-960x600.jpg">
						<Icon className="fa solid fa-atom"></Icon>
						<CourseName>Matemática</CourseName>
					</Course>
					<Course bg="https://cursinhoparamedicina.com.br/wp-content/uploads/2022/10/Biologia-celular-1.jpg">
						<Icon className="fa solid fa-atom"></Icon>
						<CourseName>Biologia</CourseName>
					</Course>
					<Course bg="https://www.anchieta.br/hubfs/ci%C3%AAncias%20econ%C3%B4micas%20na%20unianchieta.jpg">
						<Icon className="fa solid fa-atom"></Icon>
						<CourseName>Ciências Econômicas</CourseName>
					</Course>
					<Course bg="https://static.mundoeducacao.uol.com.br/vestibular/2021/03/ciencia-politica.jpg">
						<Icon className="fa solid fa-atom"></Icon>
						<CourseName>Ciência Política</CourseName>
					</Course>
					<Course bg="https://t42748.vteximg.com.br/arquivos/ids/159854-1920-1280/papel-da-sociologia-na-politica-do-brasil.jpg?v=637611938599330000">
						<Icon className="fa solid fa-atom"></Icon>
						<CourseName>Sociologia</CourseName>
					</Course>
					<Course bg="https://multivix.edu.br/wp-content/uploads/2019/03/estudar-letras.jpg">
						<Icon className="fa solid fa-atom"></Icon>
						<CourseName>Letras</CourseName>
					</Course>
					<Course bg="https://imagens.ebc.com.br/AqFjSKphTKlkA2GdGGIm9rTuLmw=/1600x800/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/estudantes_simulado_do_enem_brasilia_0707161048.jpg?itok=f9gCWvu3">
						<Icon className="fa solid fa-atom"></Icon>
						<CourseName>Ensino Médio</CourseName>
					</Course>
				</CourseContainer>
			</Main>
			<Footer />
		</Container>
		)
}

export default Courses