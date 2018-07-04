import { handleActions } from "redux-actions";
import { generateActionMutationMap } from './generators';
import axios from 'axios';

const initial = {
	firstName: "Jan",
	lastName: "Kowalski",
	age: "44",
	stuff: [],
	street: "Brak",
	number: 0
}

//działa
export const actionsDescriptors = {
	setNames: ["firstName", "lastName"],
	setAge: ["age"],
	setStuff: ["stuff"],
	setAddress: ["street","number"]
}

export const thunksDescriptors = {
	setAddress: (id) => axios.get(`/values/${id}`) //thunk dispatchuje akcję (opisaną wyżej) w .then tej funkcji
}

//export default handleActions(generateActionMutationMap(actionsDescriptors), initial);


