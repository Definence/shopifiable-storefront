import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'

import Products from '../components/Products'
import client from '../services/storeFront'
import Spinner from '../components/atoms/Spinner'
import { ensureTimeout } from '../services/utils'

class ProductsContainer extends PureComponent {
  constructor() {
    super()
    this.state = {
      products: null,
      collections: []
    }
  }

  async componentDidMount() {
    const collections = await ensureTimeout([client, ['collection', 'fetchAllWithProducts']], undefined)
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
    const { products } = this.state
    return products ? <Products products={products} /> : <Spinner />
  }
}

export default withRouter(ProductsContainer)
