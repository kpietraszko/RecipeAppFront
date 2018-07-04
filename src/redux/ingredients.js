import axios from 'axios';
import { handleActions } from 'redux-actions';
import { generateActionMutationMap, generateMapDispatchToProps } from './generators';

const initial = {
	allIngredients: []
}

const actionsDescriptors = {
	setAllIngredients: ["allIngredients"]
}
const thunksDescriptors = {
	setAllIngredients: () => axios.get("/ingredients")
}
export const mapDispatchToPropsIngredients = () => generateMapDispatchToProps(actionsDescriptors, thunksDescriptors)

export default handleActions(generateActionMutationMap(actionsDescriptors), initial);