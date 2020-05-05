import React from 'react'
import { withRouter } from 'react-router-dom'

import client from '../services/storeFront'
import Product from '../components/Product'

class ProductContainer extends React.PureComponent {
  state = {
    product: null
  }

  async componentDidMount() {
    const { id } = this.props.match.params
    const product = await client.product.fetch(id)
    this.setState(() => ({ product }))
  }

  render() {
    const { product } = this.state

    return product && <Product {...product} />
  }
}

export default withRouter(ProductContainer)
