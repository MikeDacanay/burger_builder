import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
	orders: [],
	loading: false,
	purchased: false,
}

const reducer = (state = initialState, action) => {
	if(action.type === actionTypes.PURCHASE_INIT){
		return updateObject(state,{
			purchased: false,
		})
	}
	if(action.type === actionTypes.PURCHASE_BURGER_START){
		return updateObject(state,{
			loading: true,
		})
	}
	if(action.type === actionTypes.PURCHASE_BURGER_SUCCESS){
		const newOrder = updateObject(action.orderData,{
			id: action.orderId,
		});

		return updateObject(state,{
			loading: false,
			orders: state.orders.concat(newOrder),
			purchased: true,
		})		
	}
	if(action.type === actionTypes.PURCHASE_BURGER_FAIL){
		return updateObject(state,{
			loading: false,
		})
	}
	if(action.type === actionTypes.FETCH_ORDERS_START){
		return updateObject(state,{
			loading: true,
		})
	}
	if(action.type === actionTypes.FETCH_ORDERS_SUCCESS){
		return updateObject(state,{
			loading: false,
			orders: action.orders,
		})
	}
	if(action.type === actionTypes.FETCH_ORDERS_FAIL){
		return updateObject(state,{
			loading: false,			
		})
	}


	return state;
};

export default reducer;