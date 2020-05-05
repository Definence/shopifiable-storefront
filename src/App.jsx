import React, { PureComponent } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import Navigation from './components/Navigation'
import Cart from './components/Cart'
import logo from './assets/images/factory43smokestack.png'
import ProductsContainer from './containers/ProductsContainer'
import ProductContainer from './containers/ProductContainer'
import withCart from './services/hocs/withCart'
import './App.scss'

class App extends PureComponent {
  render() {
    return (
      <Router>
        <>
          <img id='main_logo' alt='logo' src={logo} />
          <Navigation />
          <Cart />
          <Switch>
            <Route path="/collections/:type" exact component={ProductsContainer} />
            <Route path="/collections/products/:id" exact component={ProductContainer} />
          </Switch>
        </>
      </Router>
    )
  }
}

export default withCart(App)
