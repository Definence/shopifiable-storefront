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

  // handleOptionChange = (event) => {
  //   const target = event.target
  //   let selectedOptions = this.state.selectedOptions
  //   selectedOptions[target.name] = target.value

  //   const selectedVariant = this.props.client.product.helpers.variantForOptions(this.props.product, selectedOptions)

  //   this.setState({
  //     selectedVariant: selectedVariant,
  //     selectedVariantImage: selectedVariant.attrs.image
  //   })
  // }

  // handleQuantityChange = (event) => this.setState({ selectedVariantQuantity: event.target.value })

  render() {
    const { product, history } = this.props
    const primaryImg = this.state.selectedVariantImage || product.images[0]
    const secondaryImg = product.images[1]
    const variant = this.state.selectedVariant || product.variants[0]
    // const variantQuantity = this.state.selectedVariantQuantity || 1

    // const buildVariantOpts = product.options.map((option) => (
    //   <Select
    //     handleOptionChange={this.handleOptionChange}
    //     key={option.id.toString()}
    //     option={option}
    //   />
    // ))

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
        {/* <br />
        {buildVariantOpts}
        <br />
        <label>
          Quantity
          <input min='1' type='number' defaultValue={variantQuantity} onChange={this.handleQuantityChange}></input>
        </label>

        <button onClick={() => this.props.addCartLineItem(variant.id, variantQuantity)}>Add to Cart</button> */}
      </div>
    )
  }
}

export default withRouter(ProductsItem)
