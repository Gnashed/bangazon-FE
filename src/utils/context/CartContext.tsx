'use client'

/**
 * When combining useContext and useReducer, you need to separate both into their own context. In this case, CartContext will provide the current list of items in the cart and CartDispatchContext provides the functions that lets components dispatch actions.
 * 
 * Remember, these are the steps to combine useContext and useReducer:
 *   1. Create the context
 *   2. Put state and dispatch into context
 *   3. Use context anywhere in the tree
 * 
 * Note about Dispatch:
 *   Dispatch is a TypeScript utility type provided by the useReducer hook. It represents a function that dispatches actions to a reducer. You need to import this from React as it's part of React's type definitions for useReducer.
 * 
 *   TLDR: Importing Dispatch makes sure TS knows what kind of actions are being sent.
 * 
 * */

import { useContext, ReactNode ,createContext, useReducer, Dispatch, useEffect } from 'react';
import { ProductData } from '@/types/api';

export interface CartItem {
  id: number,
  itemQuantity: number;
  product: ProductData;
}; 

// Remember that type 'initial-cart' will initialize the cart with localStorage.
type CartAction =
  | { type: 'added'; id: number; itemQuantity: number; product: ProductData }
  | { type: 'deleted'; id: number }
  | { type: 'updated'; item: CartItem }
  | { type: 'initial-cart'; items: CartItem[] };

let nextId = 1;

function cartReducer(cartItems: CartItem[], action: CartAction) {
  switch (action.type) {
    case 'initial-cart': {
      return action.items;
    }
    case 'added': {
      const newItem = [
        ...cartItems, {
        id: action.id,
        itemQuantity: action.itemQuantity,
        product: action.product,
      }];
      
      const newItemStringified = JSON.stringify(newItem);
      localStorage.setItem("cartItems", newItemStringified);
      return newItem;
    }
    case 'deleted': {
      const cartWithoutDeletedItem = cartItems.filter((item) => item.id !== action.id);
      localStorage.setItem('cartItems', JSON.stringify(cartWithoutDeletedItem));
      return cartWithoutDeletedItem;
    }
    case 'updated': {

    }
    default: {
      throw new Error('Unknown action: ' + action.type);
    }
  }
};

// Create the context and provide it a default state. Both are null as the actual values will be provided by the Cart Page component.
export const CartContext = createContext<CartItem[]>([]);
export const CartDispatchContext = createContext<Dispatch<CartAction> | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  // When using useReducer, React gives us a dispatch function.
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      dispatch({ type: 'initial-cart', items: JSON.parse(storedCart) });
    }
  }, []);

  return (
    <CartContext.Provider value={cartItems}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

export function useAddToCart() {
  const dispatch = useContext(CartDispatchContext);
  if (!dispatch) {
    throw new Error('useAddToCart must be used within a CartProvider.');
  }

  // Return the function that dispatches the action.
  return (item: ProductData) => {
    dispatch({
      type: 'added',
      id: nextId++,
      itemQuantity: 1,
      product: item,
    });
  };
};

export function useRemoveFromCart() {
  const dispatch = useContext(CartDispatchContext);
  if (!dispatch) {
    throw new Error('useRemoveFromCart must be used within a CartProvider.');
  }

  // Return the function that dispatches the action.
  return (id: number) => {
    dispatch({
      type: 'deleted',
      id: id,
    });
  };
};
