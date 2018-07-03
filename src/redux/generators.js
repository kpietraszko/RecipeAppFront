//generuje kreatory akcji (dla generatora mapy dispatch) na podstawie deskryptorów
const generateActionCreators = (actionsDescriptors) => {
	let actionCreators = {};
	for (let key in actionsDescriptors) {
		actionCreators[key] = payload => {
			let action = { type: key };
			for (let field in actionsDescriptors[key]) { //field to indeks tablicy
				action[actionsDescriptors[key][field]] = payload[actionsDescriptors[key][field]];
			}
			return action;
		}
	}
	return actionCreators;
}
//generuje creatory dla thunków: zamiast akcji ma zwracac funkcje dispatch => {}
const generateThunkCreators = (actionCreators, thunksDescriptors) => {
	if (!thunksDescriptors)
		return null;
	let thunkCreators = {};
	for (let key in thunksDescriptors) {
		thunkCreators[key] = (...args) => {
			return dispatch => {
				thunksDescriptors[key](args)
					.then(response => {
						dispatch(actionCreators[key](response.data));
					})
					.catch(error => console.log(error));
			}
		}
	}
	return thunkCreators;
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
//komponent wywołuje to przekazując deskryptory (ktore importuje z konkretnego pliku akcji) i wrzuca do connecta
//akcje wywołać normalnie: this.props.setNames({firstName: "Jan", lastName: "Kowalski"})
export const generateMapDispatchToProps = (actionsDescriptors, thunksDescriptors) => {
	let mapDispatchToProps = {};
	let actionCreators = generateActionCreators(actionsDescriptors);
	let thunksCreators = generateThunkCreators(actionCreators, thunksDescriptors);
	for (let key in actionsDescriptors) {
		mapDispatchToProps[key] = actionCreators[key];
		if (thunksCreators && thunksCreators[key])
			mapDispatchToProps[key + "Thunk"] = thunksCreators[key]; //np bedzie i setAddress i setAddressThunk jako propy
	}
	return mapDispatchToProps;
}
