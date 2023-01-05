import styled from 'styled-components'

const Container = styled.div`
	border-top: 1px solid lightgray;
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	color: lightgray;
	text-shadow: 1px 1px 3px black;
	text-align: center;
	padding: 10px 0;
`

const Title = styled.h4``

const Grade = styled.div`
	margin: 10px 0;
	transition: .5s;
	cursor: pointer;

	&:hover {
		color: aquamarine;
	}
`

const GradeIcon = styled.i`
	margin-right: 5px;
`

const Grades = () => {
	return (
		<Container>
			<Title>Notas Recentes</Title>
			<Grade>
				<GradeIcon className="fa-solid fa-school" />
				Cálculo 1 - <span style={{color: "lightgreen"}}>80</span>
			</Grade>
			<Grade>
				<GradeIcon className="fa-solid fa-school" />
				Álgebra Linear - 66
			</Grade>
			<Grade>
				<GradeIcon className="fa-solid fa-school" />
				Geometria Analítica - 80
			</Grade>
		</Container>
		)
}

export default Grades