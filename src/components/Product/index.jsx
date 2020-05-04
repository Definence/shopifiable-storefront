import React, {Component} from 'react'

import VariantSelector from '../VariantSelector'
import './styles.css'

class Product extends Component {
  constructor(props) {
    super(props)
    const selectedOptions = {}
    props.product.options.forEach((selector) => {
      selectedOptions[selector.name] = selector.values[0].value
    })
    this.state = { selectedOptions }
  }

  findImage = (images, variantId) => {
    const primary = images[0]

    const image = images.filter(function (image) {
      return image.variant_ids.includes(variantId)
    })[0]

    return (image || primary).src
  }

  handleOptionChange = (event) => {
    const target = event.target
    let selectedOptions = this.state.selectedOptions
    selectedOptions[target.name] = target.value

    const selectedVariant = this.props.client.product.helpers.variantForOptions(this.props.product, selectedOptions)

    this.setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.attrs.image
    })
  }

  handleQuantityChange = (event) => this.setState({ selectedVariantQuantity: event.target.value })

  render() {
    const variantImage = this.state.selectedVariantImage || this.props.product.images[0]
    const variant = this.state.selectedVariant || this.props.product.variants[0]
    const variantQuantity = this.state.selectedVariantQuantity || 1

    const buildVariantOpts = this.props.product.options.map((option) => (
      <VariantSelector
        handleOptionChange={this.handleOptionChange}
        key={option.id.toString()}
        option={option}
      />
    ))

    return (
      <div className="Product">
        {this.props.product.images.length ? <img src={variantImage.src} alt={`${this.props.product.title} product shot`}/> : null}
        <h5>{this.props.product.title}</h5>
        <span>${variant.price}</span>
        <br />
        {buildVariantOpts}
        <br />
        <label>
          Quantity
          <input min="1" type="number" defaultValue={variantQuantity} onChange={this.handleQuantityChange}></input>
        </label>

        <button onClick={() => this.props.addVariantToCart(variant.id, variantQuantity)}>Add to Cart</button>
      </div>
    )
  }
}

export default Product
