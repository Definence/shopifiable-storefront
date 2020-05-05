import React, { useState } from 'react'

import './styles.sass'
import Select from '../atoms/Select'

const Product = ({ title, descriptionHtml, images, variants, ...props }) => {
  const [currentVariant, setVariant] = useState(variants[0])
  const [quantity, setQuantity] = useState(1)
  const image = currentVariant.image || images[0]
  const variantOpts = variants.map((v) => ({ value: v.id, label: v.title }))

  const onChangeVariant = ({ target: { value } }) => {
    const newVariant = variants.find((v) => v.id === value)
    return setVariant(newVariant)
  }

  const onVariantImageClick = (imgSrc) => {
    const newVariant = variants.find((v) => v.image.src === imgSrc)
    return setVariant(newVariant)
  }

  const buildImages = () => {
    const images = Array.from(new Set(variants.map(({ image }) => image.src)))

    return images.map((i) => (
      <div key={i} className='variant-img-container' onClick={() => onVariantImageClick(i)}>
        <img src={i} alt='variant-image'/>
      </div>
    ))
  }

  return (
    <div id='product'>
      <div id='details'>
        <h1>{title}</h1>
        <span dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
      </div>

      <div id='image-container'>
        <img src={image.src} alt='product-image'/>
      </div>

      <div id='variant-selection'>
        <h1 id='price'>$ {currentVariant.price}</h1>
        <label>Size</label>
        <Select onChange={onChangeVariant} options={variantOpts} />
        <br />
        <label>Quantity</label>
        <br />
        <input onChange={({ target: { value } }) => setQuantity(value)} value={quantity} min='1' id='quantity' type='number' />
        <button>ADD TO CART</button>
        <br />
        <br />
        {buildImages()}
      </div>
    </div>
  )
}

export default Product
