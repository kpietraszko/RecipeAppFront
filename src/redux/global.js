import { handleActions } from 'redux-actions';
import { generateActionMutationMap, generateMapDispatchToProps } from './generators';

const initial = {
	currentPageTitle: "Przepisy"
}
export const actionsDescriptors = {
	setCurrentPageTitle: ["currentPageTitle"]
}
export const mapDispatchToPropsGlobal = () => generateMapDispatchToProps(actionsDescriptors);

export default handleActions(generateActionMutationMap(actionsDescriptors), initial);