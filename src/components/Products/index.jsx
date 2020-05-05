import React, { PureComponent } from 'react'

import ProductsItem from '../ProductsItem'
import './styles.sass'

class Products extends PureComponent {
  render() {
    const products = this.props.products.map((product) => (
      <ProductsItem key={product.id.toString()} product={product} />
    ))

    const noContent = (
      <h5>No products available</h5>
    )

    return (
      <div className="grid">
        {products.length > 0 ? products : noContent}
      </div>
    )
  }
}

export default Products
