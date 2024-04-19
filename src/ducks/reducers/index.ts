import { ActionType, CartItemType, ProductType } from '../context';

export const productReducer = (state: ProductType[], action: ActionType) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      const newProduct: ProductType = {
        ...action.payload,
      };
      return [...state, newProduct];

    case 'DELETE_PRODUCT':
      return state.filter((product) => product.id !== action.payload.id);

    case 'UPDATE_PRODUCT':
      return state.map((product) =>
        product.id === action.payload.id
          ? { ...product, ...action.payload }
          : product
      );

    default:
      return state;
  }
};

export const cartReducer = (state: CartItemType[], action: ActionType) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        return state.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const newCartItem: CartItemType = {
          ...action.payload,
          quantity: 1,
        };
        return [...state, newCartItem];
      }

    case 'DELETE_CART_ITEM':
      return state.filter((item) => item.id !== action.payload.id);

    case 'INCREASE_QUANTITY':
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case 'DECREASE_QUANTITY':
      return state
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 0 }
            : item
        )
        .filter((item) => item.quantity > 0);

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
};
