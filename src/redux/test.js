import { handleActions } from "redux-actions";

//zwykły sposób
const initial = {
	firstName: "Jan",
	lastName: "Kowalski",
	age: "44",
	stuff: []
}
/*
const actions = {
	setNames: "SET_NAMES",
	setAge: "SET_AGE"
}
const actionCreators = {
	setNames: names => ({ //w przypadku thunka będzie zwracać funkcję
		type: actions.setNames,
		firstName: names.firstName,
		lastName: names.lastName
	}),
	setAge: age => ({
		type: actions.setAge,
		age
	})
}
export default handleActions({
	[actions.setNames]: (state, action) => ({
		...state,
		firstName: action.firstName,
		lastName: action.lastName
	})
}, initial); */
//a chcę
const actionsDescriptors = {
	setNames: ["firstName", "lastName"],
	setAge: ["age"]
}
//generuję kreatory akcji (dla komponentów) na podstawie deskryptorów
//w komponencie wywołać bez arg i po kropce nazwe akcji: generateActionCreators().setNames({firstName: "Jan", lastName: "Kowalski"})
export const generateActionCreators = () => {
	let actionCreators = {};
	for (let key in actionsDescriptors) {
		console.log(key);
		actionCreators[key] = (payload) => {
			let action = { type: key };
			for (let field in actionsDescriptors[key]) {
				action[field] = payload[field];
			}
			return action;
		}
	}
	return actionCreators;
}

//generuję mapowanie (dla handleActions) na podstawie deskryptorów
const actionToMutationMap = {};
for (let key in actionsDescriptors) {
	actionToMutationMap[key] = (state, action) => {
		let mutation = { ...state }
		for (let field in actionsDescriptors[key]) {
			mutation[field] = action[field];
		}
		return mutation;
	}
}
export default handleActions(actionToMutationMap, initial);


