import Client from 'shopify-buy'

const storeFrontClient = (
  Client.buildClient({
    storefrontAccessToken: 'e7303a568a85616c3f023abf64e8117a', // unauthenticated
    domain: 'shopifiable-app.myshopify.com'
  })
)

export default storeFrontClient
