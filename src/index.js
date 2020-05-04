import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Client from 'shopify-buy';
import './styles/app.css';

const client = Client.buildClient({
  storefrontAccessToken: 'e7303a568a85616c3f023abf64e8117a',
  domain: 'shopifiable-app.myshopify.com'
});

ReactDOM.render(
  <App client={client}/>,
  document.getElementById('root')
);
