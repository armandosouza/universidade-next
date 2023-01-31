import styled from 'styled-components'

const TabsDiv = styled.div`
	margin: 5px 0;
	padding: 0 5px;
	display: flex;
`

const Tabs = ({children}) => {
	return (
		<TabsDiv>
			{children}
		</TabsDiv>
	)
}

export default Tabs