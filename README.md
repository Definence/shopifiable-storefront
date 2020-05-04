## Configuring

Open up `src/index.js` and update the `domain` and `storefrontAccessToken`:

```js
const client = Client.buildClient({
  storefrontAccessToken: 'your-storefront-access-token',
  domain: 'your-shop-name.myshopify.com',
});
```

## Running

Start a local server:

```
yarn start
```

* Visit your app at [http://localhost:3000](http://localhost:3000).
