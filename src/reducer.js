const reducer = function(state, action) {
	switch(action.type) {
		case "SET_COURSE":
			return {
				...state,
				name: action.payload.name,
				description: action.payload.description,
				tag: action.payload.tag,
				level: action.payload.level,
				img: action.payload.img
			}
		case "SET_COURSES":
			return {
				...state,
				courses: action.payload
			}
		case "SET_SUBJECTS":
			return {
				...state,
				subjects: action.payload
			}
		case "SET_LESSONS":
			return {
				...state,
				lessons: action.payload
			}
		case "SET_USERS":
			return {
				...state,
				users: action.payload
			}
		case "SET_QUESTIONS":
			return {
				...state,
				questions: action.payload
			}
		case "RESPONSE":
			return {
				...state,
				showMsg: true,
				statusMsg: action.payload.statusMsg || '',
				msg: action.payload.msg
			}
		case "CLEAR_INPUTS":
			for(const field of action.payload) {
				return {
					...state,
					[field]: '',
					showMsg: false
				}
			}
			break
		case "HANDLE_TAB":
			return {
				...state,
				type: action.payload
			}
		case "SET_STATE":
			return {
				...state,
				[action.fieldName]: action.payload
			}
		case "SET_LESSON":
			return {
				...state,
				title: action.payload.title,
				description: action.payload.description,
				img: action.payload.img,
				typeLesson: action.payload.typeLesson,
				video: action.payload.video
			}
		case "SET_QUESTION":
			return {
				...state,
				title: action.payload.title,
				optionA: action.payload.optionA,
				optionB: action.payload.optionB,
				optionC: action.payload.optionC,
				optionD: action.payload.optionD
			}
		case "SET_SUBJECT":
			return {
				...state,
				name: action.payload.name,
				img: action.payload.img,
				description: action.payload.description,
				semester: action.payload.semester
			}
		case "SHOW_MODAL":
			return {
				...state,
				showModal: true,
				showModalButton: true
			}
		case "CLOSE_MODAL":
			return {
				...state,
				showModal: false,
				msgModal: 'Deseja editar seu perfil?'
			}
		default:
			throw new Error()
	}
}

export default reducer