import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'

import Cart from '../components/Cart'
import Products from '../components/Products'
import client from '../services/storeFront'

class ProductsContainer extends PureComponent {
  constructor() {
    super()
    this.state = {
      isCartOpen: false,
      checkout: { lineItems: [] },
      products: [],
      collections: []
    }
  }

  async componentDidMount() {
    const checkout = await client.checkout.create()
    const collections = await client.collection.fetchAllWithProducts()
    const products = this.currentProducts(collections)

    this.setState({ checkout, collections, products })
  }

  componentDidUpdate(prevProps) {
    const { collections } = this.state
    const { type } = this.props.match.params
    const collectionChanged = prevProps.match.params.type !== type

    if (collectionChanged) {
      this.setState(() => ({ products: this.currentProducts(collections) }))
    }
  }

  currentProducts = (collections) => {
    const { type } = this.props.match.params
    const currentCollection = collections.find((c) => c.title.toLowerCase() === type)

    return currentCollection ? currentCollection.products : []
  }

  addCartLineItem = (variantId, quantity) => {
    this.setState({ isCartOpen: true })

    const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}]
    const checkoutId = this.state.checkout.id

    return client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      this.setState({ checkout: res })
    })
  }

  updateCartQuantity = (lineItemId, quantity) => {
    const checkoutId = this.state.checkout.id
    const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]

    return client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      this.setState({ checkout: res })
    })
  }

  removeCartLineItem = (lineItemId) => {
    const checkoutId = this.state.checkout.id

    return client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
      this.setState({ checkout: res })
    })
  }

  closeCart = () => this.setState({ isCartOpen: false })

  render() {
    return (
      <>
        <Products
          products={this.state.products}
          client={client}
          addCartLineItem={this.addCartLineItem}
        />

        <Cart
          checkout={this.state.checkout}
          isCartOpen={this.state.isCartOpen}
          closeCart={this.closeCart}
          updateCartQuantity={this.updateCartQuantity}
          removeCartLineItem={this.removeCartLineItem}
        />
      </>
    )
  }
}

export default withRouter(ProductsContainer)
