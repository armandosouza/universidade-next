import styled from 'styled-components'

const Image = styled.img`
	width: 70px;
	height: 70px;
	border-radius: 50%;
	border: 3px solid #3e3d53;
	cursor: pointer;
	transition: 1s;

	&:hover {
		filter: grayscale(.5);
	}
`

const Avatar = ({avatar}) => {
	return (
		<Image src={avatar}/>
		)
}

export default Avatar