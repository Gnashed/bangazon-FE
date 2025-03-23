'use client'

import Button from 'react-bootstrap/Button';
import { CartContext, useRemoveFromCart } from "@/utils/context/CartContext";
import { useContext } from 'react';

export default function CartPage() {
  const cartItems = useContext(CartContext);
  const removeFromCart = useRemoveFromCart();

  if (cartItems.length === 0) {
    return (
      <div className='d-flex flex-column align-items-center my-5'>
        <h1>Cart</h1>
        <h2 className="my-5">Uh oh! Your shopping cart is empty. Ready to add some items? 😊</h2>
      </div>
    )
  }

  return (
    <div className='d-flex flex-column align-items-center my-5'>
      <h1>Cart</h1>
        <div>
          {cartItems.map((item) => (
            <div className='border border-2 p-3' key={item.id}>
              <p>Id: {item.id}</p>
              {/* TODO: User needs to add item quantity */}
              <p>Item Quantity: {item.itemQuantity}</p>
              <p>Item information:</p>
              <ul>
                <li>{item.product.name}</li>
                <li>Category: {item.product.category}</li>
                <li>{item.product.description}</li>
                <li>${item.product.price}</li>
                <li>{item.product.dateAdded}</li>
              </ul>
              <Button variant='link' onClick={() => removeFromCart(item.id)}>Remove</Button>
            </div>
          ))}
      </div>
    </div>
  );
};
