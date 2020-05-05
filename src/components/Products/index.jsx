import React, { PureComponent } from 'react'

import ProductsItem from '../ProductsItem'
import './styles.sass'

class Products extends PureComponent {
  render() {
    const products = this.props.products.map((product) => (
      <ProductsItem
        addCartLineItem={this.props.addCartLineItem}
        client={this.props.client}
        key={product.id.toString()}
        product={product}
      />
    ))

    return (
      <div className="grid">
        {products}
      </div>
    )
  }
}

export default Products
