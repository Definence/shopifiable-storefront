import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';
import Client from 'shopify-buy'

const client = Client.buildClient({
  storefrontAccessToken: 'e7303a568a85616c3f023abf64e8117a', // unauthenticated
  domain: 'shopifiable-app.myshopify.com'
})

ReactDOM.render(
  <React.StrictMode>
    <App client={client} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
