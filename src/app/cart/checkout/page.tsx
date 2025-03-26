'use client';

import Button from 'react-bootstrap/Button';
import CheckoutForm from '@/Components/forms/checkout/CheckoutForm';

// TODO: Might be better to use Bootstrap Rows and Columns
export default function CheckoutPage() {
  return (
    <>
      <h1 className='text-center my-5'>Checkout</h1>
      <div className='d-flex justify-content-center my-5'>
        <div className='d-flex flex-column align-items-center'>
          {/* Left side */}
          <div className='d-flex flex-column align-items-center'>
            {/* TODO: Render shipping form. */}
            <CheckoutForm />
          </div>
          
          {/* Right side */}
          <div>
            {/* Cart Item Components */}
            <h4>Shipping</h4>
            <h4>Total</h4>
          </div>
        </div>
      </div>
    </>
  );
}
