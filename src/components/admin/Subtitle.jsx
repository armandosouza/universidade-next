import styled from 'styled-components'

const Text = styled.h3`
	font-size: 24px;
	text-align: center;
	margin: 10px 0;
`

const Subtitle = ({children}) => {
	return (
		<Text>{children}</Text>
	)
}

export default Subtitle