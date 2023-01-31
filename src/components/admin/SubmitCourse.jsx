import styled from 'styled-components'

const SubmitCourseDiv = styled.span`
	background-color: ${props => props.submit === 'success' ? '#00ab66' : '#e57373'};
	border: 1px solid ${props => props.submit === 'success' ? '#198754' : '#d32f2f'};
	border-radius: 9px;
	text-align: center;
	width: 70%;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 30px;
	font-size: 16px;
	text-shadow: 1px 1px 3px black;
	color: whitesmoke;
	margin: 10px 0;
`

const SubmitCourse = ({children, submit}) => {
	return (
		<SubmitCourseDiv submit={submit}>
			{children}
		</SubmitCourseDiv>
	)
}

export default SubmitCourse