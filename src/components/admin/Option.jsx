import styled from 'styled-components'

const OptionContainer = styled.option``

const Option = ({children, value, defaultValue, disabled}) => {
	return (
		<OptionContainer value={value} defaultValue={defaultValue} disabled={disabled ? disabled : null}>{children}</OptionContainer>
	)
}

export default Option