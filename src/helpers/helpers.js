const clearInputs = (dispatch, payload) => {
	dispatch({type: "CLEAR_INPUTS", payload: payload})
}

const handleTab = (dispatch, payload) => {
	dispatch({type: "HANDLE_TAB", payload: payload})
}

export {
	clearInputs,
	handleTab
}