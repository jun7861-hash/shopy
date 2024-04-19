'use client';

import { useState } from 'react';

import Button from '@/components/button';
import Heading from '@/components/heading';
import Link from '@/components/link';
import List from '@/components/list';
import ListItem from '@/components/list/item';
import { ActionType, ProductType, useAppContext } from '@/ducks/context';

const Shop = () => {
  const { state, dispatch } = useAppContext();

  const [viewedProduct, setViewedProduct] = useState<ProductType | {}>({});

  const handleViewProduct = (product: {
    id: string;
    name: string;
    description: string;
    price: number;
  }) => {
    setViewedProduct(product);
  };

  const handleCloseViewedProduct = () => {
    setViewedProduct({});
  };

  const handleAddToCart = () => {
    const product = viewedProduct as {
      id: string;
      name: string;
      description: string;
      price: number;
    };
    const action: ActionType = { type: 'ADD_TO_CART', payload: product };
    dispatch(action);
  };

  const handleBuyNow = () => {
    handleAddToCart();
  };

  return (
    <div>
      <Link href="/manage">Manage</Link>
      <Link href="/shop/cart">Cart</Link>
      <Heading variant="h1">Shop</Heading>

      <div style={{ display: 'flex', width: '100%' }}>
        <section style={{ width: '50%', padding: '10px' }}>
          <List>
            {state.products.map((product) => (
              <ListItem key={product.id}>
                <Heading variant="h2">{product.name}</Heading>
                <div>
                  <Button onClick={() => handleViewProduct(product)}>
                    View
                  </Button>
                </div>
              </ListItem>
            ))}
          </List>
        </section>

        <section style={{ width: '50%', padding: '10px' }}>
          {viewedProduct && 'id' in viewedProduct && (
            <div className="view">
              <Heading variant="h2">{viewedProduct.name}</Heading>
              <p>Description: {viewedProduct.description}</p>
              <br />
              <p>Price: {viewedProduct.price}</p>
              <div>
                <Button onClick={handleCloseViewedProduct}>Close</Button>
                <Button onClick={handleAddToCart}>Add to cart</Button>
                <Link href="/shop/checkout" onClick={handleBuyNow}>
                  Buy now
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Shop;
