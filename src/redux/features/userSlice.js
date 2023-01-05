import {createSlice} from '@reduxjs/toolkit'

let initialState = []

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		saveUser(state, action) {
			if(state) {
				state.pop()
				state.push(action.payload)
			} else {
				state.push(action.payload)
			}
		},
		editUser(state, action) {
			let user = action.payload
			state[0].profileImg = user.profileImg
			state[0].avatar = user.avatar
			state[0].status = user.status

			return state
		},
		logout() {
			return initialState
		}
	}
})

export const {saveUser, editUser, logout} = userSlice.actions

export default userSlice.reducer