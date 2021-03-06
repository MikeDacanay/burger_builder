import React, {Component} from 'react';
import {connect} from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
	state = {
		controls: {
			email: {
					elementType: 'input',
					elementConfig: {
						type: 'email',
						placeholder: 'Mail Address',
					},
					value: '',
					validation: {
						required: true,					
						isEmail: true
					},
					valid: false,
					touched: false,
				},
			password: {
					elementType: 'input',
					elementConfig: {
						type: 'password',
						placeholder: 'Password',
					},
					value: '',
					validation: {
						required: true,					
						minLength: 6,
					},
					valid: false,
					touched: false,
				},		
		},
		isSignup: true,
	}

	render(){
		const formElementsArray = [];
		for(let key in this.state.controls){
			formElementsArray.push({
				id: key,
				config: this.state.controls[key],
			})
		};

		let form = formElementsArray.map(formElement => (
			<Input
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				changed={(e) => this.inputChangedHandler(e,formElement.id)}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}				
			/>

		));

		if(this.props.loading){
			form = <Spinner />
		}

		let errorMessage = null;

		if(this.props.error){
			errorMessage = (
				<p>{this.props.error.message}</p>
			)
		}

		return (
			<div className={classes.Auth}>
				{errorMessage}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button
						btnType='Success'
					>
						Submit
					</Button>
				</form>
				<Button
					clicked={this.switchAuthModeHandler}
					btnType="Danger"
				>
					SWITCH TO {this.state.isSignup ? 'SIGNUP' : 'SIGNIN'}
				</Button>
			</div>
		)
	}

	submitHandler = (e) =>{
		e.preventDefault();
		this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value, this.state.isSignup)
	}

	switchAuthModeHandler = () =>{
		this.setState(prevState => {
			return {isSignup: !prevState.isSignup};
		});
	}


	checkValidity = (value, rules) => {
		let isValid = true;
		if(!rules){
			return true;
		}

		if(rules.required){
			isValid = value.trim() !== '' && isValid;
		}

		if(rules.minLength){
			isValid = value.length >= rules.minLength && isValid;
		}

		if(rules.maxLength){
			isValid = value.length <= rules.maxLength && isValid;
		}

		return isValid;
	}

	inputChangedHandler = (e, ctrlName) => {
		const updatedControls = {
			...this.state.controls,
			[ctrlName]: {
				...this.state.controls[ctrlName],
				value: e.target.value,
				valid: this.checkValidity(e.target.value, this.state.controls[ctrlName].validation),
				touched: true,
			}
		}

		this.setState({controls: updatedControls});
	}	
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, pass, isSignup) => dispatch(actions.auth(email, pass, isSignup))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);