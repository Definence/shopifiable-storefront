import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'

import Products from '../components/Products'
import client from '../services/storeFront'

class ProductsContainer extends PureComponent {
  constructor() {
    super()
    this.state = {
      products: [],
      collections: []
    }
  }

  async componentDidMount() {
    const collections = await client.collection.fetchAllWithProducts()
    const products = this.currentProducts(collections)

    this.setState({ collections, products })
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


  render() {
    return <Products products={this.state.products} />
  }
}

export default withRouter(ProductsContainer)
