'use client';

import React, { createContext, useReducer, useContext, Dispatch } from 'react';

import { cartReducer, productReducer } from '../reducers';

type Props = {
  children: React.ReactNode;
};

export type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export type CartItemType = {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
};

export type InitialStateType = {
  products: ProductType[];
  cart: CartItemType[];
};

export type ActionType =
  // PRODUCT
  | { type: 'ADD_PRODUCT'; payload: ProductType }
  | { type: 'DELETE_PRODUCT'; payload: { id: string } }
  | { type: 'UPDATE_PRODUCT'; payload: { id: string } }
  // CART
  | { type: 'ADD_TO_CART'; payload: ProductType }
  | { type: 'DELETE_CART_ITEM'; payload: { id: string } }
  | { type: 'INCREASE_QUANTITY'; payload: { id: string } }
  | { type: 'DECREASE_QUANTITY'; payload: { id: string } }
  | { type: 'CLEAR_CART' };

const initialState: InitialStateType = {
  products: [
    {
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      price: 5,
    },
    {
      id: '2',
      name: 'Product 2',
      description: 'Product 2 description',
      price: 10,
    },
    {
      id: '3',
      name: 'Product 3',
      description: 'Product 3 description',
      price: 15,
    },
  ],
  cart: [],
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => {} });

const mainReducer = (
  { products, cart }: InitialStateType,
  action: ActionType
): InitialStateType => ({
  products: productReducer(products, action),
  cart: cartReducer(cart, action),
});

const AppProvider = (props: Props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
