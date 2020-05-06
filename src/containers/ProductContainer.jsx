import React from 'react'
import { withRouter } from 'react-router-dom'

import client from '../services/storeFront'
import Product from '../components/Product'
import Spinner from '../components/atoms/Spinner'
import { ensureTimeout } from '../services/utils'

class ProductContainer extends React.PureComponent {
  state = {
    product: null
  }

  async componentDidMount() {
    const { id } = this.props.match.params
    const product = await ensureTimeout([client, ['product', 'fetch']], 1000, id)

    this.setState(() => ({ product }))
  }

  render() {
    const { product } = this.state
    return product ? <Product {...product} /> : <Spinner />
  }
}

export default withRouter(ProductContainer)
