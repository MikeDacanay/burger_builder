import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxilary from '../Auxilary';

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component{
		constructor(props){
			super(props);
			this.state = {
				err: null
			}

			this.reqInterceptor = axios.interceptors.request.use(req=>{
				this.setState({err: null});
				return req;
			});

			this.resInterceptor = axios.interceptors.response.use(res=> res, err => {
				this.setState({err: err});
			});
		}
		
		// THIS NEEDS RUNS IF COMOPNENT ISNT UP
		componentWillUnmount (){
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.request.eject(this.resInterceptor);
		}

		/*
		state = {
			err:
		};

		componentDidMount = () => {
			axios.interceptors.request.use(req=>{
				this.setState({err: null});
				return req;
			});

			axios.interceptors.response.use(res=> res, err => {
				this.setState({err: err});
			});
		}*/

		errorConfirmedHandler = () => {
			this.setState({err: null});
		}

		render(){
			return (
				<Auxilary>
					<Modal 
						show={this.state.err}
						modalClosed={this.errorConfirmedHandler}
					>
						{this.state.err ? this.state.err.message: null}
					</Modal>
					<WrappedComponent {...this.props}/>			
				</Auxilary>
			)
		}
		
	}
}

export default withErrorHandler;