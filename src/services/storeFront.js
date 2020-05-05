import Client from 'shopify-buy'

const storeFrontClient = (
  Client.buildClient({
    storefrontAccessToken: process.env.REACT_APP_STOREFRONT_ACCESS_TOKEN, // unauthenticated
    domain: process.env.REACT_APP_STOREFRONT_DOMAIN
  })
)

export default storeFrontClient
