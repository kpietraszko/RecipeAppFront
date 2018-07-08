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
	setRecipesAll: (filter) => axios.get("/recipe", { params: filter}) //thunk dispatchuje akcję (opisaną wyżej) w .then tej funkcji
}
export const mapDispatchToPropsRecipes = () => generateMapDispatchToProps(actionsDescriptors, thunksDescriptors);

export default handleActions(generateActionMutationMap(actionsDescriptors), initial);