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

const Admin = styled.span`
	border-radius: 9px;
	background-color: #006994;
	color: whitesmoke;
	font-size: 16px;
	padding: 5px 10px;
	text-align: center;
	margin: 5px 0;
	cursor: pointer;

	&:hover {
		background-color: whitesmoke;
		color: #006994;
	}
`

const ProfileMenu = ({avatar, name, admin}) => {
	return (
		<Profile>
			<Avatar avatar={avatar}/>
			{name}
			{!admin && 
				<Admin>Área administrativa</Admin>
			}
		</Profile>
		)
}

export default ProfileMenu