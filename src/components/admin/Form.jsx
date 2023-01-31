import styled from 'styled-components'

const FormContainer = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const Form = ({children}) => {
	return (
		<FormContainer>{children}</FormContainer>
	)
}

export default Form