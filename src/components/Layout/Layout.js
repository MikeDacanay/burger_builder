import React, {Component} from 'react';

import Auxilary from '../../hoc/Auxilary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css';

//THIS SHOULD BE IN HOC AS A SUBFOLDER

class Layout extends Component {
	
	state = {
		showSideDrawer: false,
	}

	render(){
		return (
			<Auxilary>
				<Toolbar
					drawerToggleClicked={this.sideDrawerToggleHandler}
				/>
				<SideDrawer
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}
				/>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Auxilary>
		)
	}	

	sideDrawerToggleHandler = (prevState) =>{
		this.setState((prevState) => {
			return {showSideDrawer: !prevState.showSideDrawer};
		});
	}

	sideDrawerClosedHandler = () =>{
		this.setState({showSideDrawer:false});
	}	
}
export default Layout;
