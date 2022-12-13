import styled from 'styled-components'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Container = styled.div``

const Main = styled.div`
	padding-bottom: 20px;
	width: 90%;
	margin: 0 auto;
`

const Content = styled.p`
	font-size: 20px;
	padding: 5px;
`

const Title = styled.h2`
	font-size: 40px;
	padding: 20px 0;
	text-align: center;
`

const About = () => {
	return (
		<Container>
			<Navbar bg="https://www.up.edu.br/wp-content/uploads/2019/10/ecoville-gero-1280x424.jpg"/>
			<Main>
				<Title>Sobre</Title>
				<Content>
					A <b>universidade Next</b> conta com um <b>campus virtual completo</b>,
				 	com biblioteca à disposição dos alunos, além de tutores para auxiliar nas 
				 	disciplinas de cada período e uma plataforma de fácil uso para as aulas e avaliações.
				</Content>
				<Content>
					Por que entregamos <b>educação superior de forma gratuita</b>?
				</Content>
				<Content>
					Porque acreditamos no futuro da educação brasileira, mas, principalmente, na força 
					dos estudantes em alcançar os seus objetivos profissionais através da educação. O estudo sempre
					será um dos principais meios de <b>ascensão social</b>. 
				</Content>
				<Content>
					Aqui você poderá revisar conteúdos do <b>ensino médio</b>, acessar programas completos de <b>graduação</b>,
					<b> pós-graduação</b>, <b>cursos de idiomas</b> e <b>cursos de extensão</b>. Tudo pensado e voltado para o mercado de trabalho,
					para que você possa colocar todo o conhecimento em prática.
				</Content>
				<Content>
					Você define seu <b>ritmo de estudo</b>. Seja no ônibus, no trem, no metrô, na sua casa, no trabalho, não importa.
					Você, e exclusivamente você, define quando, onde e como vai estudar. Nós apenas recomendamos que seja em um momento
					em que você consiga focar e concentrar nas aulas e nos textos. Nada mais que isso.
				</Content>
				<Content>
					As aulas ficam disponibilizadas <b>24 horas por dia</b>. As avaliações são totalmente on-lines, basta ter acesso a internet.
					A média de aprovação na universidade Next é <b>7</b>, e contamos com <b>avaliações de recuperação</b> caso você não alcance a nota.
					Também temos outros métodos de avaliações que contam para o somatório final, como <b>testes, pesquisas, estudo dirigido</b>...
				</Content>
				<Content>
					Caso queira complementar seus estudos com atividades extracurriculares, participar de eventos, congressos,
					ter acesso a um acervo exclusivo de cursos, basta transformar sua conta em uma conta <b>Premium</b>. Mas não é preciso pagar para estudar,
					 a plataforma continuará gratuita.
				</Content>
			</Main>
			<Footer/>
		</Container>
		)
}

export default About