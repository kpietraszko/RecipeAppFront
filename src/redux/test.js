import { handleActions } from "redux-actions";
import { generateActionMutationMap } from './generators';

const initial = {
	firstName: "Jan",
	lastName: "Kowalski",
	age: "44",
	stuff: []
}

//działa
export const actionsDescriptors = {
	setNames: ["firstName", "lastName"],
	setAge: ["age"],
	setStuff: ["stuff"]
}

export default handleActions(generateActionMutationMap(actionsDescriptors), initial);


