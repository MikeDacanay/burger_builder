import React, {Component} from 'react';

import Auxilary from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux'; 
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

class BurgerBuilder extends Component{
	state = {
		//local ui	
		purchasing: false,
	};

	componentDidMount(){
		console.log(this.props);
		this.props.onInitIngredients();
	}

	render(){
		const disabledInfo = {
			...this.props.ings,
		};

		for(let key in disabledInfo){
			disabledInfo[key] = !disabledInfo[key]
		}

		let orderSummary = null;		

		let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

		if(this.props.ings){										
			burger = (
				<Auxilary>
					<Burger
						ingredients = {this.props.ings}					
					/>
					<BuildControls
						ingredientAdded = {this.props.onIngredientAdded}
						ingredientRemove = {this.props.onIngredientRemoved}
						disabled= {disabledInfo}
						price={this.props.price}
						purchaseable={this.updatePurchaseState(this.props.ings)}
						ordered={this.purchaseHandler}
					/>
				</Auxilary>
			);

			orderSummary = (
				<OrderSummary
					price={this.props.price}
					ingredients={this.props.ings}
					purchaseCanceled={this.purchaseCancelHandler}
					purchaseContinue={this.purchaseContinueHandler}
				/>
			);			
		}

		return (
			<Auxilary>
				<Modal 
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Auxilary>
		);
	}

	purchaseHandler = () => {
		this.setState({purchasing:true});
	}

	purchaseContinueHandler = () => {
		// this.props.history.push({
		// 	pathname: '/checkout',
		// 	search: '?' + queryString
		// });
		this.props.onInitPurchase();		
		this.props.history.push('/checkout');
	}

	purchaseCancelHandler = () =>{
		this.setState({purchasing:false});
	}

	updatePurchaseState = (ingredients) =>{

		const sum = Object.keys(ingredients).map(igKey =>{
			return ingredients[igKey];
		})
		.reduce((sum, el)=>{
			return sum+el;
		}, 0);

		return sum > 0;
	} 
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) => dispatch(
			actions.removeIngredient(ingName)
		),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));