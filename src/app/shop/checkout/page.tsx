'use client';

import Button from '@/components/button';
import Heading from '@/components/heading';
import Link from '@/components/link';
import { ActionType, useAppContext } from '@/ducks/context';
import { getTotalNumber } from '@/helpers/getTotalNumber';

const Checkout = () => {
  const { state, dispatch } = useAppContext();

  const totalItems = getTotalNumber(state.cart, 'quantity');
  const totalPrice = getTotalNumber(state.cart, 'price');

  const handleClearCart = () => {
    const action: ActionType = {
      type: 'CLEAR_CART',
    };
    dispatch(action);
  };

  return (
    <div>
      <Link href="/shop">Shop</Link>
      <Link href="/shop/cart">Cart</Link>
      {state.cart.length > 0 && (
        <div>
          <Heading variant="h1">Checkout</Heading>
          <section style={{ padding: '10px' }}>
            <p>
              You are about to purchase {totalItems}
              &nbsp;
              {totalItems === 1 ? 'item' : 'items'}
            </p>
            <Heading variant="h2">Total Price: {totalPrice}</Heading>
          </section>
          <Button onClick={handleClearCart}>Purchase</Button>
        </div>
      )}

      {state.cart.length <= 0 && <p>Nothing to checkout</p>}
    </div>
  );
};

export default Checkout;
