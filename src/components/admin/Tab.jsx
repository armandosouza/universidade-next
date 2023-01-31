import styled from 'styled-components'

const TabContainer = styled.div`
	margin: 0 1px;
	border-radius: 9px 9px 0 0;
	background-color: #006994;
	color: whitesmoke;
	font-weight: bold;
	font-size: 14px;
	padding: 3px 5px;
	border: 1px solid lightblue;
	cursor: pointer;
	transition: .5s;

	&:hover {
		background-color: lightblue;
		color: black;
	}

	&.selected {
		background-color: lightblue;
		color: black;
	}
`

const Tab = ({children, onClick, className}) => {
	return (
		<TabContainer onClick={onClick} className={className}>{children}</TabContainer>
	)
}

export default Tab