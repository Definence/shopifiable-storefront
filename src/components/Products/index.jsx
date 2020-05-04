import React, { PureComponent } from 'react'

import Product from '../Product'
import './styles.css'

class Products extends PureComponent {
  render() {
    const products = this.props.products.map((product) => (
      <Product
        addVariantToCart={this.props.addVariantToCart}
        client={this.props.client}
        key={product.id.toString()}
        product={product}
      />
    ))

    return (
      <div className="Products">
        {products}
      </div>
    )
  }
}

export default Products