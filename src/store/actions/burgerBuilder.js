import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name,
	}
}

export const removeIngredient = (name) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name,
	}
}

export const initIngredients = () => {
	return dispatch => {

		axios.get('/ingredients.json')
		.then(res => dispatch(setIngredients(res.data)))
		.catch(err => dispatch(fetchIngredientsFailed()));
	};
};

//created to be executed in async dispatcher
function setIngredients(ings){
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ings			
	}
}

function fetchIngredientsFailed(){
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED,
	}	
}