import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
// import styles from './App.module.css';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

class App extends Component {
	// state = {
	// 	show: true
	// };


	// componentDidMount(){
	// 	setTimeout(() =>{
	// 		this.setState({show:false})
	// 	}, 5000);

	// }



  render(){
    return (
      <div>
        <Layout>
          <Switch>
            <Route 
              path='/checkout' 
              component={Checkout}
            />
            <Route 
              path='/orders' 
              component={Orders}
            />
            <Route 
              path='/auth' 
              component={Auth}
            />
            <Route 
              path='/' 
              component={BurgerBuilder}
            />          
          </Switch>
        </Layout>
      </div>
    )
  }
}

export default App;
