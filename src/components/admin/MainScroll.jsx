import styled from 'styled-components'

const Main = styled.div`
	width: 65%;
	height: 100vh;
	position: relative;
	overflow-y: scroll;

	::-webkit-scrollbar {
		width: 10px;
	}

	::-webkit-scrollbar-track {
		background: lightgray;
		border-radius: 30px;
	}

	::-webkit-scrollbar-thumb {
		background: gray;
		border-radius: 30px;
	}
`

const MainScroll = ({children}) => {
	return (
		<Main>{children}</Main>
	)
}

export default MainScroll