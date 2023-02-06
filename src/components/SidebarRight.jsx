import styled from 'styled-components'
import {device} from '../responsive'

import ProfileMenu from './ProfileMenu'
import Tasks from './Tasks'
import Grades from './Grades'

const Container = styled.aside`
	width: 15%;
	background-color: #7f7d9c;
	height: 100vh;

	@media ${device.mobileP} {
		display: none;
	}
`

const SidebarRight = ({avatar, name, admin}) => {
	return (
		<Container>
			<ProfileMenu avatar={avatar} name={name} admin={admin}/>
			<Tasks />
			<Grades />
		</Container>
		)
}

export default SidebarRight