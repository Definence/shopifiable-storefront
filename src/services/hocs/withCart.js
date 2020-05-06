import React, { useEffect, useState, createContext } from 'react'

import client from '../storeFront'

const CartContext = createContext()

export const cartManageable = (Component) => (props) => {
  return (
    <CartContext.Consumer>
      {(cartProps) => <Component {...props} {...cartProps} />}
    </CartContext.Consumer>
  )
}

const withCart = (Component) => (props) => {
  const [checkout, changeCheckout] = useState({ lineItems: [] })
  const [isCartOpen, changeCartOpened] = useState(false)

  const initializeCheckout = async () => {
    const checkoutId = localStorage.getItem('checkoutId')
    let checkout

    if (checkoutId) {
      try {
        checkout = await client.checkout.fetch(checkoutId)
      } catch {
        localStorage.removeItem('checkoutId')
      }
    }

    if (!checkout) {
      checkout = await client.checkout.create()
      localStorage.setItem('checkoutId', checkout.id)
    }

    changeCheckout(checkout)
  }

  useEffect(() => {
    initializeCheckout()
  }, [])

  const addCartLineItem = async (variantId, quantity = 1) => {
    const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}]
    const newCheckout = await client.checkout.addLineItems(checkout.id, lineItemsToAdd)

    changeCheckout(newCheckout)
    return changeCartOpened(true)
  }

  const updateCartQuantity = async (lineItemId, quantity = 1) => {
    const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]
    const newCheckout = await client.checkout.updateLineItems(checkout.id, lineItemsToUpdate)

    return changeCheckout(newCheckout)
  }

  const removeCartLineItem = async (lineItemId) => {
    const newCheckout = await client.checkout.removeLineItems(checkout.id, [lineItemId])

    return changeCheckout(newCheckout)
  }

  const cartProps = {
    checkout,
    isCartOpen,
    changeCartOpened,
    addCartLineItem,
    updateCartQuantity,
    removeCartLineItem
  }

  return (
    <CartContext.Provider value={cartProps}>
      <Component {...props} />
    </CartContext.Provider>
  )
}

export default withCart
