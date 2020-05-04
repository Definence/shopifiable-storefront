import React from 'react'
import ReactDOM from 'react-dom'
import Client from 'shopify-buy'

import App from './App'

const client = Client.buildClient({
  storefrontAccessToken: 'e7303a568a85616c3f023abf64e8117a', // unauthenticated
  domain: 'shopifiable-app.myshopify.com'
})

ReactDOM.render(
  <App client={client}/>,
  document.getElementById('root')
)
