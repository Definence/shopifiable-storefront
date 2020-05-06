import React, { useState } from 'react'

import './styles.sass'
import Select from '../atoms/Select'
import { cartManageable } from '../../services/hocs/withCart'

const Product = ({ title, descriptionHtml, images, variants, addCartLineItem }) => {
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
        <img src={i} alt='variant' />
      </div>
    ))
  }

  const buildComparePrice = () => {
    const { price, compareAtPrice } = currentVariant
    const isCompareRequired = compareAtPrice && compareAtPrice > price

    if (isCompareRequired) return (
      <h6 id='compare-price'>
        was
        <span> ${compareAtPrice}</span>
      </h6>
    )
  }

  const onZoomedMouseMove = (e) => {
    const imgContainer = document.getElementById('image-container')
    const image = document.getElementById('zoomed')
    const rect = imgContainer.getBoundingClientRect()
    const offset = {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    }
    const cursorImageX = e.pageX - offset.left
    const cursorImageY = e.pageY - offset.top
    const cursorImageXFraction = cursorImageX / rect.width * 100
    const cursorImageYFraction = cursorImageY / rect.height * 100
    const transform = cursorImageXFraction + '% ' + cursorImageYFraction + '%'
    const scale = imgContainer.getAttribute('scale')

    image.style['transform-origin'] = transform
    image.style.transform = `scale(${scale})`
  }

  const onMouseOut = (e) => {
    const image = e.target
    image.style.transform = `scale(1)`
  }

  return (
    <div id='product'>
      <div id='details'>
        <h1>{title}</h1>
        <span dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
      </div>

      <div id='image-container' scale='1.5' onMouseMove={onZoomedMouseMove} onMouseOut={onMouseOut}>
        <div id="zoomed" style={{ backgroundImage: `url(${image.src})` }} />
      </div>

      <div id='variant-selection-container'>
        <div id='variant-selection'>
          <h1 id='price'>$ {currentVariant.price}</h1>
          {buildComparePrice()}
          <label>Style</label>
          <Select onChange={onChangeVariant} options={variantOpts} />
          <br />
          <label>Quantity</label>
          <br />
          <input onChange={({ target: { value } }) => setQuantity(value)} value={quantity} min='1' id='quantity' type='number' />
          <button onClick={() => addCartLineItem(currentVariant.id)}>ADD TO CART</button>
          <br />
          <br />
          {buildImages()}
        </div>
      </div>
    </div>
  )
}

export default cartManageable(Product)
