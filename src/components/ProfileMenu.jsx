import styled from 'styled-components'

import {Link, useNavigate} from 'react-router-dom'

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
	margin: 10px 0;

	& a:link, & a:visited {
		border-radius: 9px;
		background-color: #006994;
		color: whitesmoke;
		font-size: 16px;
		padding: 5px 10px;
		text-align: center;
		cursor: pointer;
		text-decoration: none;
	}

	& a:hover {
		background-color: whitesmoke;
		color: #006994;
	}
`

const ProfileMenu = ({avatar, name, admin}) => {
	const navigate = useNavigate()

	return (
		<Profile>
			<Avatar avatar={avatar}/>
			{name}
			{admin && 
				<Admin>
					<Link to="/dashboard/admin">Área administrativa</Link>
				</Admin>
			}
		</Profile>
		)
}

export default ProfileMenu