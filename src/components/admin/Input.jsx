import styled from 'styled-components'

const InputContainer = styled.input`
	height: 40px;
	width: 70%;
	font-family: 'Didact Gothic', sans-serif;
	font-size: 20px;
	border-radius: 9px;
	outline: none;
	border: 1px solid #e6e2e1;
	text-align: center;
	margin: 10px 0;
`

const Input = ({children, type, onChange, onClick, placeholder, defaultValue, value, required, style}) => {
	return (
		<InputContainer style={style} type={type ? type : 'text'} onChange={onChange} onClick={onClick} placeholder={placeholder} defaultValue={defaultValue} required={required ? required : null}/>
	)
}

export default Input