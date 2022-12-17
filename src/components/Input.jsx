import styled from 'styled-components'

const Container = styled.div`
	width: 50%;
	height: 40px;
	border-radius: 7px;
	margin: 10px 0;
	display: flex;
	align-items: center;
	justify-content: space-around;
`

const Icon = styled.i`
	font-size: 20px;
	text-shadow: 1px 1px 3px lightgray;
`

const Field = styled.input`
	height: 100%;
	width: 90%;
	outline: none;
	font-size: 20px;
	font-weight: bold;
	color: gray;
	border: none;
	border-bottom: 1px solid black;
	text-align: center;
	font-family: 'Didact Gothic', sans-serif;
`

const Input = ({id, name, type, placeholder, icon, onChange}) => {
	return (
		<Container>
			<Icon className={icon}></Icon>
			<Field onChange={onChange} placeholder={placeholder} name={name} id={id} type={type}/>
		</Container>
		)
}

export default Input