import { handleActions } from "redux-actions";
import { generateActionMutationMap } from './generators';

const initial = {
	firstName: "Jan",
	lastName: "Kowalski",
	age: "44",
	stuff: []
}

//działa chyba
export const actionsDescriptors = {
	setNames: ["firstName", "lastName"],
	setAge: ["age"]
}

export default handleActions(generateActionMutationMap(actionsDescriptors), initial);


