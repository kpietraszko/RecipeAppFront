//generuję kreatory akcji (dla komponentów) na podstawie deskryptorów
//w komponencie wywołać przekazując deskryptory i po kropce nazwe akcji: generateActionCreators().setNames({firstName: "Jan", lastName: "Kowalski"})
export const generateActionCreators = (actionsDescriptors) => {
	let actionCreators = {};
	for (let key in actionsDescriptors) {
		actionCreators[key] = (payload) => {
			let action = { type: key };
			for (let field in actionsDescriptors[key]) { //field to indeks tablicy
				action[actionsDescriptors[key][field]] = payload[actionsDescriptors[key][field]];
			}
			return action;
		}
	}
	return actionCreators;
}

//generuję mapowanie (dla handleActions) na podstawie deskryptorów
export const generateActionMutationMap = (actionsDescriptors) => {
	const actionToMutationMap = {};
	for (let key in actionsDescriptors) {
		actionToMutationMap[key] = (state, action) => {
			let mutation = { ...state }
			for (let field in actionsDescriptors[key]) {
				mutation[actionsDescriptors[key][field]] = action[actionsDescriptors[key][field]];
			}
			return mutation;
		}
	}
	return actionToMutationMap;
}