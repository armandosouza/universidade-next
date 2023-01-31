import styled from 'styled-components'

const TitleText = styled.h2`
	font-size: 36px;
	margin: 10px;
`

const Hr = styled.hr`
`

const Title = ({children}) => {
	return (
		<>
			<TitleText>{children}</TitleText>
			<Hr/>
		</>
	)
}

export default Title