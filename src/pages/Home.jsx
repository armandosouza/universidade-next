import styled from 'styled-components'
import {device} from '../responsive'

import {Link} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Container = styled.div``

const PanelContainer = styled.div`
	background-color: lightgray;
	width: 100%;
	height: 20vh;
	position: relative;
	display: flex;
	justify-content: center;

	@media ${device.mobileP} {
		display: none;
	}
`

const Panel = styled.div`
	position: relative;
	top: 20px;
	border-radius: 12px;
	height: 100%;
	background-color: white;
	width: 80%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	box-shadow: 0px 1px 8px black;

	@media ${device.mobileP} {
		display: none;
	}
`

const PanelItem = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 150px;
	height: 100%;
	text-align: center;
	cursor: pointer;
	transition: .5s;

	&:hover {
		color: skyblue;
	}
`

const Image = styled.i`
	font-size: 26px;
	margin-bottom: 10px;
`

const Description = styled.p`
	margin: 0;
	text-transform: uppercase;
	font-size: 16px;
	font-weight: bold;
`

const News = styled.section`
	height: 80vh;
	width: 100%;
	background: url('https://static-cse.canva.com/blob/963625/Canvastudentsbanner.png');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	border-radius: 0 0 50px 50px;
	border-top: 2px solid black;
`

const Subtitle = styled.h2`
	color: white;
	font-size: 40px;
	padding: 20px 0;
	text-align: center;

	@media ${device.mobile} {
		font-size: 28px;
	}
`

const EventContainer = styled.div`
	display: flex;
	justify-content: space-around;
	margin-top: 15px;

	@media ${device.mobileP} {
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
`

const Event = styled.article`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 30%;
	background-color: whitesmoke;
	transition: .5s;

	&:hover {
		transform: scale(1.1);
	}

	@media ${device.mobileP} {
		margin: 10px 0;
		width: 60%;
	}
`

const EventImage = styled.img`
	height: 50%;
	width: 100%;
	object-fit: cover;
`

const EventTitle = styled.h3`
	color: darkblue;
	font-size: 20px;
	padding: 5px 0;
	text-align: center;
`

const EventButton = styled.span`
	background-color: lightgray;
	color: black;
	padding: 5px 15px;
	font-size: 18px;
	cursor: pointer;
	transition: .5s;

	&:hover {
		background-color: purple;
		color: white;
	}
`

const EventDescription = styled.p`
	text-align: center;
	line-height: 23px;
	padding-bottom: 10px;
	width: 90%;
`

const Highlights = styled.section`
	width: 100%;
`

const HighlightContainer = styled.div`
	margin: 20px auto;
	display: flex;
	justify-content: space-around;
	width: 90%;
	margin-bottom: 60px;
	flex-wrap: wrap;
`

const Highlight = styled.div`
	margin: 10px;
	width: 200px;
	height: 200px;
	background: url('https://thumbs.dreamstime.com/b/blue-gradient-background-modern-blue-wavy-gradation-background-blue-gradient-background-modern-blue-wavy-gradation-background-181589322.jpg');
	background-size: cover;
	background-position: center;
	border: 2px solid aquamarine;
	border-radius: 9px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	box-shadow: 0px 2px 4px black;
	@keyframes rotate {
		0% {
			transform: rotateY(0deg);
		}
		100% {
			transform: rotateY(180deg);
		}
	}

	&:hover {
		animation: .7s rotate;

		img {
			display: none;
		}

		h4 {
			display: block;
		}
	}
`

const HighImage = styled.img`
	width: 90%;
	height: 90%;
`

const HighDesc = styled.h4`
	@keyframes fadeIn {
		0% {
			opacity: 0
		}
		100% {
			opacity: 1
		}
	}

	text-align: center;
	font-weight: bold;
	display: none;
	color: whitesmoke;
	font-size: 16px;
	animation: fadeIn 2s;
	text-shadow: 1px 2px 4px black;
`

const Enroll = styled.section`
	width: 100%;
	height: 70vh;
	background: url('https://s7ap1.scene7.com/is/image/rmit/student-homepage-bowen-st-1920px?wid=1440&hei=450&scl=1');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	border-radius: 50px 50px 0 0;
	display: flex;
	align-items: center;
	justify-content: space-around;
`

const EnrollButton = styled.span`
	background: linear-gradient(90deg, skyblue, #797ef6);
	font-size: 26px;
	padding: 10px 30px;
	box-shadow: 1px 1px 4px black;
	border-radius: 20px;
	cursor: pointer;
	transition: .5s;
	text-align: center;

	&:hover {
		transform: scale(1.1);
		box-shadow: 1px 3px 6px black;
	}

	& a:visited, a:link {
		text-decoration: none;
		color: black;
		font-weight: bold;
	}

	@media ${device.mobileP} {
		padding: 10px 15px;
	}
`

const Home = () => {
	return (
		<Container>
			<Navbar bg="https://www.uninorte.com.br/wp-content/uploads/2018/01/banner-enem-2018.jpg"/>
			<PanelContainer>
				<Panel>
					<PanelItem>
						<Image className="fa-solid fa-gear"/>
						<Description>Engenharia</Description>
					</PanelItem>
					<PanelItem>
						<Image className="fa-solid fa-atom"/>
						<Description>Química</Description>
					</PanelItem>
					<PanelItem>
						<Image className="fa-solid fa-calculator"/>
						<Description>Matemática</Description>
					</PanelItem>
					<PanelItem>
						<Image className="fa-solid fa-landmark"/>
						<Description>Ciências Políticas</Description>
					</PanelItem>
					<PanelItem>
						<Image className="fa-solid fa-staff-snake"/>
						<Description>Medicina</Description>
					</PanelItem>
					<PanelItem>
						<Image className="fa-solid fa-earth-americas"/>
						<Description>Geografia</Description>
					</PanelItem>
					<PanelItem>
						<Image className="fa-solid fa-plus"/>
						<Description>Mais</Description>
					</PanelItem>
				</Panel>
			</PanelContainer>
			<News id="eventos">
				<Subtitle style={{paddingTop: "40px"}}>Eventos</Subtitle>
				<EventContainer>
					<Event>
						<EventImage src="https://i0.wp.com/gobanners.com.br/wp-content/uploads/2019/09/5-dicas-de-marketing-fundamentais-para-inauguracao-de-loja.jpg?resize=1000%2C480&ssl=1"/>
						<EventTitle>Inauguração da Universidade Next</EventTitle>
						<EventDescription>Está inaugurada a universidade a partir do dia 18/11/2022. Acessem já!</EventDescription>
						<EventButton>Ver mais <i className="fa-solid fa-arrow-right"></i></EventButton>
					</Event>
				</EventContainer>
			</News>
			<Highlights>
				<Subtitle style={{color: "#797ef6"}}>Por que estudar na Universidade Next?</Subtitle>
				<HighlightContainer>
					<Highlight>
						<HighImage src="https://cdn.iconscout.com/icon/free/png-256/5-star-medal-4175541-3474613.png"/>
						<HighDesc>Excelência no ensino! Nota 5 em todos os quesitos avaliados no ensino a distância.</HighDesc>
					</Highlight>
					<Highlight>
						<HighImage src="https://cdn-icons-png.flaticon.com/512/3750/3750019.png"/>
						<HighDesc>Comunidade acadêmica ativa, com mais de 1 mil alunos em 30 cursos de graduação diferentes.</HighDesc>
					</Highlight>
					<Highlight>
						<HighImage src="https://cdn-icons-png.flaticon.com/512/5352/5352114.png"/>
						<HighDesc>Siga seus próprios passos e consiga seu certificado! Temos + de 30 opções de cursos!</HighDesc>
					</Highlight>
					<Highlight>
						<HighImage src="https://cdn-icons-png.flaticon.com/512/2941/2941658.png"/>
						<HighDesc>Professores qualificados e mentor disponível 24h por dia!</HighDesc>
					</Highlight>
					<Highlight>
						<HighImage src="https://cdn-icons-png.flaticon.com/512/3557/3557635.png"/>
						<HighDesc>Sistema único de educação criado por nós mesmos, que foca no seu aprendizado contínuo e regular.</HighDesc>
					</Highlight>
				</HighlightContainer>
			</Highlights>
			<Enroll>
				<Subtitle style={{width: "66%", textShadow: "1px 2px 4px black"}}>Não perca a oportunidade de se matricular ainda hoje! <span style={{color: "red"}}>50% OFF</span> - Escolha seu curso e comece seus estudos!</Subtitle>
				<EnrollButton><Link to="/registro">Matricular agora!</Link></EnrollButton>
			</Enroll>
			<Footer />
		</Container>
		)
}

export default Home