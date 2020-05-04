import React, { PureComponent } from 'react'

import Cart from './components/Cart'
import Products from './components/Products'
import Navigation from './components/Navigation'
import './App.scss'
import logo from './assets/images/factory43smokestack.png'

class App extends PureComponent {
  constructor() {
    super()
    this.state = {
      isCartOpen: false,
      checkout: { lineItems: [] },
      products: [],
      collections: []
    }
  }

  componentDidMount() {
    this.props.client.checkout.create()
      .then((res) => this.setState({ checkout: res }))

    this.props.client.collection.fetchAllWithProducts()
      .then((res) => this.setState({ collections: res }))
  }

  addCartLineItem = (variantId, quantity) => {
    this.setState({ isCartOpen: true })

    const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}]
    const checkoutId = this.state.checkout.id

    return this.props.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      this.setState({ checkout: res })
    })
  }

  updateCartQuantity = (lineItemId, quantity) => {
    const checkoutId = this.state.checkout.id
    const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]

    return this.props.client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      this.setState({ checkout: res })
    })
  }

  removeCartLineItem = (lineItemId) => {
    const checkoutId = this.state.checkout.id

    return this.props.client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
      this.setState({ checkout: res })
    })
  }

  closeCart = () => this.setState({ isCartOpen: false })

  render() {
    const { collections } = this.state

    return (
      <div>
        <img id='main_logo' alt='logo' src={logo} />

        <Navigation collections={collections} />

        <Products
          products={this.state.products}
          client={this.props.client}
          addCartLineItem={this.addCartLineItem}
        />

        <Cart
          checkout={this.state.checkout}
          isCartOpen={this.state.isCartOpen}
          closeCart={this.closeCart}
          updateCartQuantity={this.updateCartQuantity}
          removeCartLineItem={this.removeCartLineItem}
        />
      </div>
    )
  }
}

export default App
