## Live [DEMO](https://shopify-storefront.herokuapp.com/)

This App allows you to trade shopify goods from external resource. It is build like an online store that uses storefront `graphql API`. When the order is fulfilled and paid it will appear in the shopify store `Orders` dashboard. From that point, its your concern to perform its delivery

## Configuring

Create `.env` file with next variables from [here](https://docs.google.com/document/d/1-fEGHHhOyQCYcoeRc7xpJ6A5CUm18rS8uzkKhkF1Qe0/edit):

```
STOREFRONT_ACCESS_TOKEN = ***
STOREFRONT_DOMAIN = ***
```

## Running

Start a local server:

```
yarn start
```

* Visit your app at [http://localhost:3000](http://localhost:3000).
