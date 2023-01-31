import styled from 'styled-components'

const SelectInput = styled.select`
	outline: none;
	margin: 10px 0;
	font-family: 'Didact Gothic', sans-serif;
	font-size: 20px;
	height: 40px;
	width: 70%;
	border-radius: 9px;
	border: 1px solid #e6e2e1;
	text-align: center;
`

const Select = ({children, defaultValue, onChange, value, required}) => {
	return (
		<SelectInput value={value} defaultValue={defaultValue} onChange={onChange} required={required ? required : null}>
			{children}
		</SelectInput>
	)
}

export default Select