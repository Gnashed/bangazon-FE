'use client';

import CheckoutForm from '@/Components/forms/checkout/CheckoutForm';

// TODO: Might be better to use Bootstrap Rows and Columns
export default function CheckoutPage() {
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

            <h4>Shipping: </h4>
            <h4>Total: </h4>
        
        </div>
      </div>
    </div>
  );
}
