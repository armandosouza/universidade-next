import styled from 'styled-components'

const TextAreaInput = styled.textarea`
	outline: none;
	margin: 10px 0;
	font-family: 'Didact Gothic', sans-serif;
	font-size: 20px;
	height: 200px;
	width: 70%;
	border-radius: 9px;
	border: 1px solid #e6e2e1;
	resize: none;
	text-align: center;
`

const TextArea = ({children, onChange, defaultValue, placeholder, required}) => {
	return (
		<TextAreaInput onChange={onChange} defaultValue={defaultValue} placeholder={placeholder} required={required ? required : null}/>
	)
}

export default TextArea