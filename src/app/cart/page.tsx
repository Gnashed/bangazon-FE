'use client'

import Button from 'react-bootstrap/Button';
import { CartContext, useRemoveFromCart } from "@/utils/context/CartContext";
import { useContext } from 'react';
import Image from 'next/image';

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
            <div className='d-flex align-items-center border border-2 p-3 my-5' key={item.id}>
              <Image
                className='mx-3' 
                src={item.product.imageUrl}
                alt={`picture of ${item.product.name}`}
                width={75}
                height={75}
              />
              <h6 className='mx-3'>{item.product.name}</h6>
              <h6 className='mx-3'>${item.product.price}</h6>
              {/* TODO: User needs to add item quantity */}
              <p>Item Quantity: {item.itemQuantity}</p>
              
              <Button variant='link' onClick={() => removeFromCart(item.id)} className='mx-3'>Remove</Button>
            </div>
          ))}
      </div>
    </div>
  );
};
