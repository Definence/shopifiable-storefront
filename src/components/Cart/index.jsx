import React, { PureComponent } from 'react'

import LineItem from '../LineItem'
import { cartManageable } from '../../services/hocs/withCart'
import './styles.css'

class Cart extends PureComponent {
  openCheckout = () => window.open(this.props.checkout.webUrl)

  componentDidUpdate(prevProps) {
    const cartGotOpened = !prevProps.isCartOpen && this.props.isCartOpen
    const cartGotClosed = prevProps.isCartOpen && !this.props.isCartOpen

    if (cartGotOpened) {
      document.addEventListener('click', this.clickOutsideListener)
    }

    if (cartGotClosed) {
      document.removeEventListener('click', this.clickOutsideListener);
    }
  }

  clickOutsideListener = (e) => {
    const clickedNode = e.target
    const cartNode = document.getElementById('Cart')
    const clickedOutside = !cartNode.contains(clickedNode)

    if (clickedOutside) this.props.changeCartOpened(false)
  }

  render() {
    const line_items = this.props.checkout.lineItems.map((line_item) => (
      <LineItem
        updateCartQuantity={this.props.updateCartQuantity}
        removeCartLineItem={this.props.removeCartLineItem}
        key={line_item.id.toString()}
        line_item={line_item}
      />
    ))

    return (
      <div id='Cart' className={`Cart ${this.props.isCartOpen ? 'Cart--open' : ''}`}>
        <header className="Cart__header">
          <h2>Your cart</h2>
          <button
            onClick={() => this.props.changeCartOpened(false)}
            className="Cart__close">
            ×
          </button>
        </header>
        <ul className="Cart__line-items">
          {line_items}
        </ul>
        <footer className="Cart__footer">
          <div className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Subtotal</div>
            <div className="Cart-info__pricing">
              <span className="pricing">$ {this.props.checkout.subtotalPrice}</span>
            </div>
          </div>
          <div className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Taxes</div>
            <div className="Cart-info__pricing">
              <span className="pricing">$ {this.props.checkout.totalTax}</span>
            </div>
          </div>
          <div className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Total</div>
            <div className="Cart-info__pricing">
              <span className="pricing">$ {this.props.checkout.totalPrice}</span>
            </div>
          </div>
          <button className="Cart__checkout" onClick={this.openCheckout}>Checkout</button>
        </footer>
      </div>
    )
  }
}

export default cartManageable(Cart)
