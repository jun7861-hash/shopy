import { CartItemType } from '@/ducks/context';

export const getTotalNumber = (
  cart: CartItemType[],
  item: keyof CartItemType
) => {
  const total = cart.reduce((accumulator, cartItem) => {
    if (typeof cartItem[item] === 'number') {
      return accumulator + cartItem[item];
    }
    return accumulator;
  }, 0);
  return total;
};
