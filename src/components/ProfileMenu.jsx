import styled from 'styled-components'
import Avatar from './Avatar'

const Profile = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	text-shadow: 1px 1px 3px black;
	color: whitesmoke;
	margin: 10px 0;
`

const ProfileMenu = ({avatar, name}) => {
	return (
		<Profile>
			<Avatar avatar={avatar}/>
			{name}
		</Profile>
		)
}

export default ProfileMenu