'use client';

import { useState } from 'react';

import Button from '@/components/button';
import Heading from '@/components/heading';
import Link from '@/components/link';
import List from '@/components/list';
import ListItem from '@/components/list/item';
import { ActionType, useAppContext } from '@/ducks/context';

const Cart = () => {
  const { state, dispatch } = useAppContext();
  const [cartItemId, setCartItemId] = useState<string | null>(null);

  const handleViewItem = (id: string) => {
    setCartItemId(id);
  };

  const handleCloseViewedItem = () => {
    setCartItemId(null);
  };

  const handleIncreaseQuantity = (id: string) => {
    const action: ActionType = {
      type: 'INCREASE_QUANTITY',
      payload: { id: id },
    };
    dispatch(action);
  };

  const handleDecreaseQuantity = (id: string) => {
    const action: ActionType = {
      type: 'DECREASE_QUANTITY',
      payload: { id: id },
    };
    dispatch(action);
  };

  return (
    <div>
      <Link href="/shop">Shop</Link>
      <Link href="/shop/checkout">Checkout</Link>
      <Heading variant="h1">My Cart</Heading>

      <div style={{ display: 'flex', width: '100%' }}>
        <section style={{ width: '50%', padding: '10px' }}>
          {state.cart.length > 0 && (
            <List>
              {state.cart.map((item) => (
                <ListItem key={item.id}>
                  <Heading variant="h2">{item.name}</Heading>
                  <div>
                    <Button onClick={() => handleViewItem(item.id)}>
                      View
                    </Button>
                  </div>
                </ListItem>
              ))}
            </List>
          )}

          {state.cart.length <= 0 && <p>Cart is empty.</p>}
        </section>

        <section style={{ width: '50%', padding: '10px' }}>
          {cartItemId && (
            <div className="view">
              {state.cart.map(
                (item) =>
                  item.id === cartItemId && (
                    <div key={item.id}>
                      <Heading variant="h2">{item.name}</Heading>
                      <p>{item.description}</p>
                      <br />
                      <p>{item.price}</p>
                      <br />
                      <p>{item.quantity}</p>
                      <div>
                        <Button onClick={handleCloseViewedItem}>Close</Button>
                        <Button onClick={() => handleDecreaseQuantity(item.id)}>
                          -
                        </Button>
                        <Button onClick={() => handleIncreaseQuantity(item.id)}>
                          +
                        </Button>
                      </div>
                    </div>
                  )
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Cart;
