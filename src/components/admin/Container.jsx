import styled from 'styled-components'

const ContainerDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	position: relative;
`

const Container = ({children}) => {
	return (
		<ContainerDiv>{children}</ContainerDiv>
	)
}

export default Container