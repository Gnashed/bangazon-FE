'use client';

import { useContext } from 'react';
import CheckoutForm from '@/Components/forms/checkout/CheckoutForm';
import OrderItem from '@/Components/OrderItem';
import { CartContext } from '@/utils/context/CartContext';

// TODO: Might be better to use Bootstrap Rows and Columns
export default function CheckoutPage() {
  const cartItems = useContext(CartContext);

  return (
    <div>
      <h1 className='text-center my-5'>Checkout</h1>
      
      <div className='d-flex justify-content-center my-5'>

        {/* Left side */}
        <div className='d-flex flex-column align-items-center'>
          <CheckoutForm />
        </div>
        
        {/* Right side */}
        <div className='d-flex flex-column align-items-center m-5'>
            {/* TODO: Render cart item components */}
            {cartItems.map((item) => (
              <OrderItem
                key={item.id}
                id={item.id}
                name={item.product.name}
                imageUrl={item.product.imageUrl}
                price={item.product.price}
                itemQuantity={item.itemQuantity}
              />
            ))}
            <h4>Shipping: $6.99</h4>
            <h4>Total: $</h4>
        
        </div>
      </div>
    </div>
  );
}
