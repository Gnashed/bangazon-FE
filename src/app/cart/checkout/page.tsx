'use client';

import { useContext } from 'react';
import CheckoutForm from '@/Components/forms/checkout/CheckoutForm';
import OrderItem from '@/Components/OrderItem';
import { CartContext } from '@/utils/context/CartContext';

// TODO: Might be better to use Bootstrap Rows and Columns
export default function CheckoutPage() {
  const cartItems = useContext(CartContext);

  const shippingCharge = 6.99;
  let cartTotal = 0;

  cartItems.forEach((item) => {
    if (item.itemQuantity > 1) {
      const itemPrice = item.product.price * item.itemQuantity;
      cartTotal += itemPrice;
    } else if (item.itemQuantity === 1) {
      cartTotal += item.product.price;
    }
    return cartTotal;
  });

  const cartTotalWithShipping = (cartTotal + shippingCharge).toFixed(2);

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
            <h4>Total: ${cartTotalWithShipping}</h4>
        
        </div>
      </div>
    </div>
  );
}
