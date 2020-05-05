import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'

import './styles.sass'

class ProductsItem extends PureComponent {
  constructor(props) {
    super(props)
    const selectedOptions = {}
    props.product.options.forEach((selector) => {
      selectedOptions[selector.name] = selector.values[0].value
    })
    this.state = { selectedOptions }
  }

  render() {
    const { product, history } = this.props
    const primaryImg = this.state.selectedVariantImage || product.images[0]
    const secondaryImg = product.images[1]
    const variant = this.state.selectedVariant || product.variants[0]

    const buildImage = () => {
      if (product.images.length) return (
        <div className='crosfading'>
          <img className='bottom' src={secondaryImg.src} alt={`${product.title} product shot`} />
          <img className='top' src={primaryImg.src} alt={`${product.title} product shot`} />
        </div>
      )
    }

    return (
      <div className='cell' onClick={() => history.push(`products/${product.id}`)}>
        {buildImage()}
        <h6>{product.title}</h6>
        <span className='price'>${variant.price}</span>
      </div>
    )
  }
}

export default withRouter(ProductsItem)
