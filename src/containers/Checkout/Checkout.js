import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import ContactData from './ContactData/ContactData';
// import * as actions from '../../store/actions/index';
class Checkout extends Component {
	// state = {
	// 	ingredients: null,
	// 	totalPrice: 0,
	// }

	render() {
		let summary = <Redirect to='/' />;

		if(this.props.ings) {
			const purchasedRedirect = this.props.purchased ? <Redirect to='/' />: null;
			summary = (
				<div>
					{purchasedRedirect}
					<CheckoutSummary
						ingredients={
							this.props.ings
						}
						checkoutCancelled={this.checkoutCancelledHandler}
						checkoutContinued={this.checkoutContinuedHandler}
					/>
					<Route 
						path={this.props.match.path + '/contact-data'} 
						component={ContactData}
					/>	
				</div>			
			);
		}

		return summary;
	}


	// componentWillMount(){
	// 	const query = new URLSearchParams(this.props.location.search);
	// 	const ingredients = {};
	// 	let price;
	// 	for(let params of query.entries()){
	// 		//['salad', '1']
	// 		if(params[0]==='price'){
	// 			price = params[1];
	// 		}else{
	// 			ingredients[params[0]] = +params[1];
	// 		}					
	// 	}

	// 	this.setState({
	// 		ingredients: ingredients,
	// 		totalPrice: price,
	// 	});
	// }

	checkoutCancelledHandler = () =>{

		this.props.history.goBack();
	}

	checkoutContinuedHandler = () =>{
		this.props.history.replace('/checkout/contact-data');
	}
}

const mapStateToProps = state => {
	return{
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased,
	}
}

export default connect(mapStateToProps)(Checkout);