import { combineReducers } from 'redux';
import recipes from './recipes';
import global from './global';
import ingredients from './ingredients';

export default combineReducers({ recipes, global, ingredients });