import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: lightgray;
	text-shadow: 1px 1px 3px black;
	text-align: center;
	border-top: 1px solid lightgray;
	padding-top: 10px;
`

const Title = styled.h4``

const Task = styled.span`
	margin: 10px 0;
	transition: .5s;
	cursor: pointer;

	&:hover {
		color: aquamarine;
	}
`

const Icon = styled.i`
	margin-right: 3px;
`

const Tasks = () => {
	return (
		<Container>
			<Title>Tarefas a fazer:</Title>
			<Task>
				<Icon className="fa-solid fa-tasks"/> 
				Aula de Limites e Derivadas: Exercícios
			</Task>
			<Task>
				<Icon className="fa-solid fa-tasks"/> 
				Tarefa 2
			</Task>
			<Task>
				<Icon className="fa-solid fa-tasks"/> 
				Tarefa 3
			</Task>
			<Task>
				<Icon className="fa-solid fa-tasks"/> 
				Tarefa 4
			</Task>
		</Container>
	)
}

export default Tasks