import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurger = (orderData) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());

		axios.post('/orders.json', orderData)
			.then(res => {
				console.log(res.data);
				dispatch(purchaseBurgerSuccess(res.data.name, orderData));
			})
			.catch(err => dispatch(purchaseBurgerFail(err)));			
	}
}

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT,
	}
}

export const fetchOrders = (token) => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		axios.get('/orders.json?auth='+ token)
			.then(res => {
				const fetchedOrders = [];
				for (let key in res.data){
					fetchedOrders.push({
						...res.data[key],
						id: key,
					});
				}
				
				dispatch(fetchOrdersSuccess(fetchOrders));		
			})
			.catch(err => {
				dispatch(fetchOrdersFail(err));
			})
	};
}


//action creators for async action dispatched

function purchaseBurgerStart(){
	return {
		type: actionTypes.PURCHASE_BURGER_START,
	};
}

function purchaseBurgerSuccess(id, orderData){
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	}
}

function purchaseBurgerFail(err){
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: err,
	}
}

function fetchOrdersSuccess(ords){
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: ords,
	}
}

function fetchOrdersFail(err){
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		err: err,
	}
}

function fetchOrdersStart(){
	return{
		type: actionTypes.FETCH_ORDERS_START,				
	}
}

