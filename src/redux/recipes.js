import { handleActions } from "redux-actions";
import { generateActionMutationMap, generateMapDispatchToProps } from './generators';
import axios from 'axios';

const initial = {
	recipes: []
}

export const actionsDescriptors = {
	setRecipesAll: ["recipes"]
}
export const thunksDescriptors = {
	setRecipesAll: (filter) => axios.get("/recipe", { params: filter }) //thunk dispatchuje akcję (opisaną wyżej) w .then tej funkcji
		.catch(error => { //HACK: loguje sie automatycznie na testowego użytkownika i ponawia request jeśli backend zwróci 401 Unauthorized
			if (error.response && error.response.status == 401) {
				return axios.post("/authentication/signIn", null,
					{
						params:
						{
							username: "testUser",
							password: "qwerty"
						}
					});
			}
		})
		.then(() => { return axios.get("/recipe", { params: filter }); })
}
export const mapDispatchToPropsRecipes = () => generateMapDispatchToProps(actionsDescriptors, thunksDescriptors);

export default handleActions(generateActionMutationMap(actionsDescriptors), initial);