import styled from 'styled-components'
import {device} from '../responsive'

import MenuNavbar from './MenuNavbar'

const Container = styled.div`
	width: 100%;
	height: 70vh;
	background: url(${props => props.bg});
	background-position: center;
	background-size: cover;
	margin: 0;
	position: relative;

	@media ${device.mobileP} {
		height: 50vh;
	}
`

const Navbar = ({bg}) => {
	return (
		<Container bg={bg}>
			<MenuNavbar/>
		</Container>
		)
}

export default Navbar