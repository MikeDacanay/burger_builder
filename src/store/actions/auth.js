import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
}

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId,
	}
}

export const authFail = (err) => {
	return{
		type: actionTypes.AUTH_FAIL,
		error: err,
	}
}

export const logout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT		
	}
}

export const checkAuthTimeout = (expirationTime) => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime*1000)
	};
}

export const auth = (email, pass, isSignup) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: pass,
			returnSecureToken: true,
		};

		let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0NC_lsQBp2Gks1hPiv6VUfD1GolRPKNU' 

		if(!isSignup){
			url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0NC_lsQBp2Gks1hPiv6VUfD1GolRPKNU';
		}

		axios.post(url, authData)
			.then(res => {
				console.log(res);
				dispatch(authSuccess(res.data.idToken, res.data.localId));	
				dispatch(checkAuthTimeout(res.data.expiresIn));
			})
			.catch(err=>{
				console.log(err);
				dispatch(authFail(err.response.data.error));
			})
	}
}
